import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sprint } from '../sprint';
import { Base } from '../base';

@Component({
  selector: 'sb-sprint-frame',
  templateUrl: './sprint-frame.component.html',
  styleUrls: ['./sprint-frame.component.css']
})
export class SprintFrameComponent extends Base implements OnInit {
  @Input() sprint:Sprint;
  @Input() showEditButton:boolean;
  @Input() showSuspendButton:boolean;
  @Input() showFinishButton:boolean;
  @Output() suspend:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() finish:EventEmitter<Sprint> = new EventEmitter<Sprint>();

  constructor() { 
  	super();
  }

  ngOnInit(): void {
  }

  suspendSprint() {
    this.suspend.emit(this.sprint);
  }

  finishSprint() {
    this.finish.emit(this.sprint);
  }

}
