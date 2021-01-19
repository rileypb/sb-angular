import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UiStateService } from '../ui-state.service';
import { Base } from '../base';
import { Sprint } from '../sprint';
import { Project } from '../project';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.css']
})
export class SprintCardComponent extends Base implements OnInit {
  @Input() sprint: Sprint;
  @Input() project: Project;
  @Input() showStartButton: boolean;
  @Output() transfer:EventEmitter<any> = new EventEmitter<any>();
  @Output() selected:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  @Output() start:EventEmitter<Sprint> = new EventEmitter<Sprint>();
  expanded: boolean = false;

  constructor(public uiState:UiStateService) {
    super();
  }

  ngOnInit(): void {
    this.expanded = this.uiState.isExpanded("sprint/" + this.sprint.id);
  }

  toggleExpanded(): void {
  	this.expanded = !this.expanded;
    this.uiState.setExpanded("sprint/" + this.sprint.id, this.expanded);
  }

  onTransfer(transferData) {
    this.transfer.emit(transferData);
  }

  onViewSprint(event) {
    event.stopPropagation();
    this.selected.emit(this.sprint);
  }

  onStartSprint(event) {
    this.start.emit(this.sprint);
  }

}
