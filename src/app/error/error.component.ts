import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    standalone: false
})
export class ErrorComponent implements OnInit {
  @Input() err:any;
  
  constructor() { }

  ngOnInit() {
  }

}
