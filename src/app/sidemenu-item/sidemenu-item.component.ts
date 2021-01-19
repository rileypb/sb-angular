import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../location.service';
import { Router }  from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidemenu-item',
  templateUrl: './sidemenu-item.component.html',
  styleUrls: ['./sidemenu-item.component.css'],
  animations: [
  	trigger('expandCollapse', [
  		transition(
  			':enter',
  			[
  				style({width:0, opacity:0}),
  				animate('0.15s ease-out',
  					style({ width:'140px', opacity: 1 }))
  			]
  		),
  		transition(
  			':leave',
  			[
  				style({width:'140px', opacity: 1}),
  				animate('0.15s ease-in', style({width:0,opacity:0}))
  			]
  		)
  	]),
  ],
})
export class SidemenuItemComponent implements OnInit {
  @Input() icon:string;
  @Input() menuItem:string;
  @Input() expand:boolean;
  @Input() nav:string;
  @Input() faIcon:string;
  @Input() fontSet:string;

  constructor(public locationService:LocationService, private router:Router) { }

  ngOnInit(): void {
  }

  navigateTo(): void {
  	this.router.navigate([this.nav]);
  }
}
