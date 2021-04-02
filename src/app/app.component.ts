import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './user';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from "@angular/material/icon";
import { LocationService } from './location.service';
import { DataService } from './data.service';
import { environment } from '../environments/environment';
import { UserInfoService } from './user-info.service';
import { Observable, Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from './news.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(
        ':enter', 
        [
          style({opacity:0}),
          animate('0.15s ease-out',
            style({opacity: 0.5}))
        ]
      ),
      transition(
        ':leave',
        [
          style({opacity:0.5}),
          animate('0.15s ease-in',
            style({opacity: 0}))
        ]
      )
    ])
  ],
})
export class AppComponent implements OnInit {
  @ViewChild("newsFeed") newsFeed:TemplateRef<any>;
  @ViewChild("newsTrigger") newsTrigger:ElementRef<any>;
  title = 'Scrumboard';
  @Input() error : string;
  @Input() syncServiceStatus : string;

  public news$:Observable<any>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public loginService: LoginService, public dataService:DataService,
      changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public matIconRegistry: MatIconRegistry,
      public userInfo:UserInfoService, private dialog:MatDialog, private newsService:NewsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    matIconRegistry.registerFontClassAlias ('fas');
  }

  ngOnInit() {
    console.log("init loginService");
    // this.loginService.init().subscribe(x => {console.log(x); this.initSync();});
    this.loginService.status.subscribe(
      value => {
        if (value == 'logged_in') {
          this.initSync();
        } else if (value == 'logged_out') {
          this.stopSync();
        }
      }
    );
  }

  initSync() : void {
    this.dataService.init();
    let sub:Subscription = this.dataService.status.subscribe(
      x => {
        if (x == 'connected') {
          this.dataService.load('news', ['news']);
          this.news$ = this.dataService.values['news'];
          sub.unsubscribe();
        }
      }
    );
  }

  stopSync() : void {
    this.dataService.stop();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showNewsFeed():void {
    console.log('showNewsFeed');
    this.dialog.open(this.newsFeed, { position: { top: `${this.newsTrigger.nativeElement.offsetTop + 32}px`, left: `${this.newsTrigger.nativeElement.offsetLeft}px` }});
    this.newsService.readAll();
  }

  closeNewsFeed():void {
    this.dialog.closeAll();
  }
}