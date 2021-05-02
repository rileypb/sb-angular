import { Injectable } from '@angular/core';
import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs';
import { Channel } from 'angular2-actioncable';
import { CableService } from './cable.service';
import { filter, mapTo, map, startWith, first } from 'rxjs/operators';
import { merge, interval, timer } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Api } from './api';
import { AuthService } from '@auth0/auth0-angular';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public resetting:boolean = false;

  public status:Observable<string>;
  private channel:Channel;
  public isConnected:Observable<boolean>;
  public isDisconnected:Observable<boolean>;
  public users:any;

  public users_by_team:any = {};

  private received:Subject<any> = new Subject<any>();

  private holds:{ [key:string]:Hold } = {}; 

  readonly values:{ [key:string]:Subject<any> } = {};

  private syncLoop;

  private syncers:SyncerRegistry;

  private unloaders:Set<Subscription> = new Set();

  constructor(public cableService:CableService, public api:Api, private auth:AuthService, private userInfo:UserInfoService) { }  

  init() : void {
  	this.channel = this.cableService.channel('SyncChannel');
  	this.channel.received().subscribe(msg => this.received.next(msg));
    this.received.pipe(
    	filter(msg => { return msg.hasOwnProperty('selector') })
    ).subscribe(msg => this.processMessage(msg));

    //this.channel.perform("cancelsync", { selector: "all" });

    this.syncers = new SyncerRegistry(this.channel, this.received);

    this.channel.connected().subscribe();
    this.channel.disconnected().subscribe();

    this.status = merge(
      this.channel.connected().pipe(mapTo("connected")), 
      this.channel.disconnected().pipe(mapTo("disconnected")),
      this.channel.rejected().pipe(mapTo("rejected"))
    ).pipe(startWith('uninitialized'), distinctUntilChanged());

    this.status.subscribe((x) => console.log(`status: ${x}`));

    this.status.subscribe((s) => {
    	if (s == 'disconnected') {
	    	console.log("resetting...");
	    	this.resetting = true;
	    	// give the UI a second to reset
	    	timer(100).pipe(first()).subscribe(x => {
	    		this.reset();
	    		this.resetting = false;
	    		console.log("done resetting.")
	    	});
	    }
    });

    this.api.get("api/me").subscribe();
    
    console.log("monitoring status...");
    this.status.subscribe((x) => {
    	if (x == 'connected') {
    		console.log("connected");
			this.auth.getAccessTokenSilently().subscribe((t) => {
				console.log("retrieved access token");
				this.channel.perform("auth", { token: t });
				this.channel.received().subscribe(msg => {
					if (msg.action == 'sync' && msg.selector == 'users') {
						this.users = msg.data;
					}
					if (msg.selector.startsWith('users_')) {
						this.users_by_team[msg.selector] = msg.data;
						this.users = [];
						let ids = [];
						for (const key in this.users_by_team) {
							for (const user of this.users_by_team[key]) { 
								if (!ids.includes(user.id)) {
									this.users.push(user);
									ids.push(user.id);
								}
							}
						}
					}
				});
			});
    	}
    })


    this.syncLoop = interval(1000).subscribe(val => this.doSync());
    this.isConnected = this.status.pipe(map(val => val == 'connected'));
    this.isDisconnected = this.status.pipe(map(val => val == 'disconnected'));
  }

  stop() {}

  reset() {
  	console.log("RESET");
  	for (let key in this.holds) {
  		let hold:Hold = this.holds[key];
  		hold.fastUnload();
		delete this.holds[hold.address];
		delete this.values[hold.address];
  	}
  	for (let sub of this.unloaders) {
  		console.log("unsubscribe sub");
  		sub.unsubscribe();
  	}
  }

  private doSync():void {
	console.log(`doSync`);
  	for (let key in this.holds) {
  		let hold:Hold = this.holds[key];
  		if (hold.needsUpdate) {
  			hold.refresh();
  		}
  	}
  }

  private processMessage(msg) : void {
  }

  load(address:string, selectors:string[]):void {
  	console.log(`load ${address}`);
  	let hold:Hold = this.holds[address];
  	if (!hold) {
  		this.holds[address] = new Hold(address, this.channel, this.api, this.syncers);
  		hold = this.holds[address];
  		hold.refresh();
  	}
  	hold.count++;
  	hold.syncOn(selectors);
  	this.values[address] = hold.value;
  }

  public unload(address:string, selectors:string[]) {
  	console.log(`unload ${address} - wait 5 seconds`);
  	let sub = interval(5000).pipe(first()).subscribe(() => {
	  	let hold:Hold = this.holds[address];
	  	if (hold) {
		  hold.count--;
		  hold.release(selectors);
		  if (hold.count == 0) {
		  	delete this.holds[address];
		    delete this.values[address];
		  }
		}
		this.unloaders.delete(sub);
  		console.log(`unload ${address} - done`);
	  }
	);
	this.unloaders.add(sub);
  }

  public fastUnload(address:string) {
  	console.log(`fast unload ${address} - done`);
  	let hold:Hold = this.holds[address];
  	hold.fastUnload();
	delete this.holds[address];
	delete this.values[address];
  }

  /*
  core.js:6157 ERROR TypeError: Cannot read property 'next' of undefined
    at DataService.update (data.service.ts:159)
    at ProjectIssueListComponent.onReorder (project-issue-list.component.ts:101)
    at ProjectIssueListComponent_sb_issue_list_3_Template_sb_issue_list_reorder_0_listener (project-issue-list.component.html:11)
    at executeListenerWithErrorHandling (core.js:15220)
    at wrapListenerIn_markDirtyAndPreventDefault (core.js:15255)
    at SafeSubscriber.schedulerFn [as _next] (core.js:25910)
    at SafeSubscriber.__tryOrUnsub (Subscriber.js:183)
    at SafeSubscriber.next (Subscriber.js:122)
    at Subscriber._next (Subscriber.js:72)
    at Subscriber.next (Subscriber.js:49)
  */

  public update(address:string, newValue:any) {
  	this.values[address].next(newValue);
  }

}
class Hold {
	public count:number = 0;
	readonly address:string;
	private selectorCounts:{ [key:string]:number } = {};
	private selectorSubscriptions:{ [key:string]:Subscription } = {};
	private uniqueSelectors:string[] = [];
	private subscription:Subscription;

	readonly value:ReplaySubject<any> = new ReplaySubject<any>();


	constructor(address:string, private syncChannel:Channel, private api:Api, private syncers:SyncerRegistry) {
		this.address = address;
		this.value.next(null);
	}

	refresh() {
		console.log(`refresh ${this.address}`);
		this.api.get('api/' + this.address).subscribe(
			success => {
				this.value.next(success);
			},
			error => {
				console.log(error);
			}
		);
	}

	get needsUpdate():boolean {
		if (this._needsUpdate) {
			this._needsUpdate = false;
			return true;
		}
		return false;
	}
	private _needsUpdate:boolean = false;

	syncOn(selectors:string[]) {
		for (let selector of selectors) {
			if (!this.selectorCounts.hasOwnProperty(selector)) {
				this.selectorCounts[selector] = 0;
			}
			this.selectorCounts[selector]++;
			if (this.selectorCounts[selector] == 1) {
				this.selectorSubscriptions[selector] = this.syncers.get(selector).sync().subscribe(
					msg => this._needsUpdate = true
				);
			}
		}
	}

	release(selectors:string[]) {
		for (let selector of selectors) {
			this.selectorCounts[selector]--;
			if (this.selectorCounts[selector] == 0){
				this.syncers.get(selector).unsync();
				this.selectorSubscriptions[selector].unsubscribe();
			}
		}
	}

	fastUnload() {
		for (let selector in this.selectorCounts) {
			this.syncers.get(selector).unsync();
			this.selectorSubscriptions[selector].unsubscribe();
		}
	}
}

class CountingSyncer {
	readonly selector:string;
	private counter:number = 0;
	private subscription:Subscription;

	private syncs:Subject<string> = new Subject<string>();

	constructor(selector:string, private syncChannel:Channel, private received:Subject<any>) {
		this.selector = selector;
	}

	sync():Observable<string> {
		this.counter++;
		if (this.counter == 1) {
			this.subscribe();
		}
		return this.syncs;
	}

	unsync() {
		this.counter--;
		if (this.counter == 0) {
			this.unsubscribe();
		}
	}

	private subscribe() {
		this.subscription = this.received.subscribe(
			msg => {
				if (msg.hasOwnProperty('selector') && msg.selector === this.selector) {
					this.syncs.next(msg);
				}
			}
		);

		this.syncChannel.perform("sync", { selector: this.selector });
	}

	private unsubscribe() {
		this.syncChannel.perform("cancelsync", { selector: this.selector });
		this.subscription.unsubscribe();
	}
}

class SyncerRegistry {
	private syncers:{ [key:string]:CountingSyncer } = {};

	constructor(private syncChannel:Channel, private received:Subject<any>) {}

	get(selector:string):CountingSyncer {
		if (!this.syncers[selector]) {
			this.syncers[selector] = new CountingSyncer(selector, this.syncChannel, this.received);
		}
		return this.syncers[selector];
	}
}