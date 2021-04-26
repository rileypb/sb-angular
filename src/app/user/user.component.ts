import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public userInfo:UserInfoService, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  login() {}

  logout() {
  	this.loginService.logout();
  }

}
