import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sb-task-compare',
    templateUrl: './task-compare.component.html',
    styleUrls: ['./task-compare.component.css'],
    standalone: false
})
export class TaskCompareComponent implements OnInit {
  @Input() task:any;

  constructor() { }

  ngOnInit(): void {
  }

}
