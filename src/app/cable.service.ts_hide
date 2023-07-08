import { Injectable } from '@angular/core';
import { ActionCableService, Channel, Cable } from 'angular2-actioncable';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { environment } from './../environments/environment';

@Injectable()
export class CableService {
  cable: Cable
  private channels: Channel[] = [];

  constructor(public actionCableService: ActionCableService) { 
    console.log(`Creating cable ${environment.cableUrl}`);
    this.cable = this.actionCableService.cable(`${environment.cableUrl}`); 
  }

  channel(channelName:string) : Channel {
    if (!this.channels.hasOwnProperty(channelName)) {
      this.channels[channelName] = this.cable.channel(channelName);
    }

    return this.channels[channelName];
  }
}
