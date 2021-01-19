import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginService } from '../login.service';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

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

  constructor(public loginService: LoginService) { }

  ngOnInit() {
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
