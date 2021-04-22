import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DataService } from '../data.service';

@Component({
  selector: 'sb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public login:LoginService, public dataService:DataService) { }

  ngOnInit(): void {
  }

  logout() {
  	this.login.logout();
  }
}
