import { Component, OnInit, Input } from '@angular/core';

import { LocationService } from '../location.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css'],
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
export class MenuContainerComponent implements OnInit {
  @Input() expand : boolean = false;

  constructor(public locationService:LocationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

      document.onclick = (args: any) : void => {
        if (args.target.id === 'blocker') {
            this.close();
        }
      }
  }

  toggleExpand() {
  	this.expand = !this.expand;
  }

  close() {
    this.expand = false;
  }

  navigateTo(event:any) {
    console.log(event);
  }

}
