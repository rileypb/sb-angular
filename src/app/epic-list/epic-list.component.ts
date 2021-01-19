import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Epic } from '../epic';
import { Base } from '../base';
import { Color } from '../color';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { UiStateService } from '../ui-state.service';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.css']
})
export class EpicListComponent extends Base implements OnInit {
  @Input() epics: Epic[];

  @Output() selectEpic:EventEmitter<Epic> = new EventEmitter<Epic>();

  @Output() transferIssue:EventEmitter<any> = new EventEmitter<any>();
  @Output() updateEpic:EventEmitter<Epic> = new EventEmitter<Epic>();
  @Output() reorderEpics:EventEmitter<any> = new EventEmitter<any>();

  constructor(private uiStateService:UiStateService) { 
  	super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log("HERE")
    moveItemInArray(event.container.data.epics, event.previousIndex, event.currentIndex);
    this.reorderEpics.emit({ fromIndex: event.previousIndex, toIndex: event.currentIndex });
  }

  clickEpic(epic:Epic) {
    this.selectEpic.emit(epic);
  }

  fontColor(bgColor:string):string {  
    return Color.fontColor(bgColor);
  }

  toggleExpandEpic(epic) {
    this.uiStateService.toggleExpand(`epic.${epic.id}`);
  }

  expanded(epic) {
    return this.uiStateService.isExpanded(`epic.${epic.id}`);
  }

  onTransferIssue(transferData) {
    this.transferIssue.emit(transferData);
  }

  onUpdateEpic(epic) {
    this.updateEpic.emit(epic);
  }

}
