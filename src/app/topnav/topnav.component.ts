import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(public locationService:LocationService, private router:Router) { 

  	// this.router.events.subscribe((res) => {
  	// 	console.log(">>> " + this.router.url);
   //      this.activeLinkIndex = this.locationService.navLinks.indexOf(this.locationService.navLinks.find(tab => tab.link === this.router.url));
   //  });
  }

  ngOnInit(): void {
  	// 	console.log(">>>>> " + this.router.url);
  	// this.activeLinkIndex = this.locationService.navLinks.indexOf(this.locationService.navLinks.find(tab => tab.link === this.router.url));
  }

}
