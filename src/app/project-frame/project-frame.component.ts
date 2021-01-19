import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Base } from '../base';

@Component({
  selector: 'app-project-frame',
  templateUrl: './project-frame.component.html',
  styleUrls: ['./project-frame.component.css']
})
export class ProjectFrameComponent extends Base implements OnInit {
  @Input() project:Project;
  @Input() showEditButton:boolean;

  constructor() {
  	super();
  }

  ngOnInit(): void {

  }

}
