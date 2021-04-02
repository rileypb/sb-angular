import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';

import { LoginService } from '../login.service';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { UserInfoService } from '../user-info.service';

import { DataService } from '../data.service';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  circle = faCircle;
  @Input() error: string;
  @Input() syncServiceStatus: string;
  @Output() toggleSidenav = new EventEmitter<string>();

  public news$:Observable<any>;

  constructor(public loginService: LoginService, public userInfo:UserInfoService, private dataService:DataService, private dialog:MatDialog) { }

  ngOnInit() {
    // this.dataService.load('news', ['news']);
    // this.news$ = this.dataService.values['news'];
  }

  login() {
  	this.loginService.login();
  }

  logout() {
  	this.loginService.logout();
  }

  toggleButtonClick() : void {
    this.toggleSidenav.emit('toggle');
  }
}
