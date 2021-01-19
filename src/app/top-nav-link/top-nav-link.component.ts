import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-top-nav-link',
  templateUrl: './top-nav-link.component.html',
  styleUrls: ['./top-nav-link.component.css']
})
export class TopNavLinkComponent implements OnInit {
  @Input() route:string;
  private _currentLocation:string;
  @Input() icon:string;
  @Input() label:string;
  @Input() tabId:string;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set currentLocation(val:string) {
  	console.log("stop here " + val + ", " + this.tabId + ": " + (val == this.tabId));
  	this._currentLocation = val;
  }
  get currentLocation():string {
  	return this._currentLocation;
  }

}
