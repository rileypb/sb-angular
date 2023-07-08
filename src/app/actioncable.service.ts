import { createConsumer, Cable, Channel as ACChannel } from '@rails/actioncable';
import { environment } from './../environments/environment';
import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs';

export class Channel {
    private channel: ACChannel;
    private connectedSubject: Subject<boolean> = new Subject<boolean>();
    private disconnectedSubject: Subject<boolean> = new Subject<boolean>();
    private receivedSubject: Subject<any> = new Subject<any>();
    private rejectedSubject: Subject<boolean> = new Subject<boolean>();

    constructor(private channelName:string, private cable: Cable) {
        this.channel = this.cable.subscriptions.create(this.channelName, {
            connected: () => {
                this.connectedSubject.next(true);
            },
            disconnected: () => {
                this.disconnectedSubject.next(false);
            },
            received: (data) => {
                console.log("received", data);
                this.receivedSubject.next(data);
            },
            rejected: () => {
                this.rejectedSubject.next(true);
            },
            perform: (action, data) => {
                console.log("perform", action, data);
                this.channel.send({ action: action, data: data });
            },
        });
    }

    received(): Observable<any> {
        if (this.cable.disconnected) {
            this.reconnect();
        }
        return this.receivedSubject;
    }

    connected(): Observable<any> {
        return this.connectedSubject;
    }

    disconnected(): Observable<any> {
        return this.disconnectedSubject;
    }

    reconnect(): void {
        this.channel = this.cable.subscriptions.create(this.channelName, {
            connected: () => {
                this.connectedSubject.next(true);
            },
            disconnected: () => {
                this.disconnectedSubject.next(false);
            },
            received: (data) => {
                this.receivedSubject.next(data);
            },
            rejected: () => {
                this.rejectedSubject.next(true);
            },
            perform: (action, data) => {

            },
        });
    }

    rejected(): Observable<any> {
        return this.rejectedSubject;
    }

    perform(action: string, data: any): void {
        return this.channel.perform(action, data);
    }
}


export class ActionCableService {
    private cable: Cable;
    
    constructor() {
        this.cable = createConsumer(environment.cableUrl);
        this.cable.connection.reopenDelay = 5000;
    }

    // a map from channel name to channel
    private channels: Map<string, Channel> = new Map();

    channel(channelName: string): Channel {
        // look up channel by name
        var channel = this.channels.get(channelName);
        if (!channel) {
            // create new channel
            channel = new Channel(channelName, this.cable);
            this.channels.set(channelName, channel);
        } else if (channel.disconnected()) {
            channel.reconnect();
        }
        return channel;
    }

}