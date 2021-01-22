import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './user';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from "@angular/material/icon";
import { LocationService } from './location.service';
import { DataService } from './data.service';
import { environment } from '../environments/environment';

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
  title = 'Scrumboard';
  @Input() error : string;
  @Input() syncServiceStatus : string;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public loginService: LoginService, public dataService:DataService,
      changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public matIconRegistry: MatIconRegistry) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    matIconRegistry.registerFontClassAlias ('fas');
  }

  ngOnInit() {
    console.log("init loginService");
    this.loginService.init().subscribe(x => {console.log(x); this.initSync();});
  }

  initSync() : void {
    this.dataService.init();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}