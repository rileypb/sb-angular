import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sprint } from '../sprint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-number-link',
  templateUrl: './sprint-number-link.component.html',
  styleUrls: ['./sprint-number-link.component.css']
})
export class SprintNumberLinkComponent implements OnInit {
  @Input() sprint:Sprint;
  @Output() navigate:EventEmitter<any> = new EventEmitter<any>();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateToSprint():void {
    this.navigate.emit();
    if (!this.sprint.completed) {
      this.router.navigate([`/projects/${this.sprint.project.id}/planning`]);
    } else {
      this.router.navigate([`/projects/${this.sprint.project.id}/retrospective`]);
    }
  }
}
