import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../comments.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { callWithSnackBar } from '../util';

@Component({
  selector: 'sb-comment-entry',
  templateUrl: './comment-entry.component.html',
  styleUrls: ['./comment-entry.component.css']
})
export class CommentEntryComponent implements OnInit {
  @Input() issueId:number;
  @Input() epicId:number;
  @Input() projectId:number;
  @Input() sprintId:number;

  public text:String;

  constructor(private commentsService: CommentsService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  submitComment():void {
  	callWithSnackBar(this.snackBar, this.commentsService.newComment({issueId: this.issueId, epicId: this.epicId, sprintId: this.sprintId, projectId: this.projectId, text: this.text}),
  		['Saving comment', 'Saved comment', 'Error saving comment']).subscribe(success => this.text = "");
  }

  shouldDisableSubmit():boolean {
    return !this.text || this.text.trim().length == 0;
  }

}
