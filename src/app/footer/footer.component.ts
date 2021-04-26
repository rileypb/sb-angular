import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { DataService } from '../data.service';
import { NewsService } from '../news.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild("newsFeed") newsFeed:TemplateRef<any>;
  @ViewChild("newsTrigger") newsTrigger:ElementRef<any>;

  @Input() news:any;

  constructor(public login:LoginService, public dataService:DataService, 
  	private newsService:NewsService, private dialog:MatDialog) { }

  ngOnInit(): void {    

  }

  logout() {
  	this.login.logout();
  }

  showNews() {
    this.dialog.open(this.newsFeed, { 
    	width: '400px', position: { bottom: '2rem' }});
    this.newsService.readAll();
  }

  closeNewsFeed():void {
    this.dialog.closeAll();
  }
}
