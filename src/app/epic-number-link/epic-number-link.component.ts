import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Epic } from '../epic';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-epic-number-link',
  templateUrl: './epic-number-link.component.html',
  styleUrls: ['./epic-number-link.component.css']
})
export class EpicNumberLinkComponent implements OnInit {
  @Input() epic:Epic;
  @Output() navigate:EventEmitter<any> = new EventEmitter<any>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToEpic():void {
    this.navigate.emit();
    this.router.navigate(['/projects', this.epic.project.id, 'epics', this.epic.id]);
  }

}
