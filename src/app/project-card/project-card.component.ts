import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css'],
    standalone: false
})
export class ProjectCardComponent implements OnInit {
  @Input() project:Project;

  constructor() { }

  ngOnInit(): void {
  }


}
