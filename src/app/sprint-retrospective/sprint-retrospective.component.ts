import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';

@Component({
  selector: 'app-sprint-retrospective',
  templateUrl: './sprint-retrospective.component.html',
  styleUrls: ['./sprint-retrospective.component.css']
})
export class SprintRetrospectiveComponent extends Base implements OnInit {
  @Input() project:Project;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
 
}
