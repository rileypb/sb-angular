import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from "@angular/material/icon";
import { LocationService } from '../location.service';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { UserInfoService } from '../user-info.service';
import { Observable, Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from '../news.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'sb-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  @ViewChild("newsFeed") newsFeed:TemplateRef<any>;
  @ViewChild("newsTrigger") newsTrigger:ElementRef<any>;
  title = 'Scrumboard';
  @Input() error : string;
  @Input() syncServiceStatus : string;

  public pulse:number = -1;

  public news$:Observable<any>;
  public user$:Observable<any>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  private lastStatus:string = null;

  private userSub:Subscription;

  constructor(public loginService: LoginService, public dataService:DataService,
      changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public matIconRegistry: MatIconRegistry,
      public userInfo:UserInfoService, private dialog:MatDialog, private newsService:NewsService,
      private themeService:ThemeService) {
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
        if (value == this.lastStatus) {
          return;
        }
        this.lastStatus = value;
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
          this.dataService.load('user_profile', []);
          this.user$ = this.dataService.values['user_profile'];
          this.dataService.pulse.subscribe(
            userId => {
              console.log(userId);
              this.pulse = userId;
            }
          );
          this.userSub = this.user$.subscribe(
            x => {
              if (x) {
                this.setTheme(x.theme);
                this.userSub.unsubscribe();
              }
            }
          );
          sub.unsubscribe();
        }
      }
    );
  }

  setTheme(themeName:string):void {
    this.themeService.setTheme(themeName);
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

  login() {
  	this.loginService.login();
  }
}
