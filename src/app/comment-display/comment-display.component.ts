import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.css']
})
export class CommentDisplayComponent implements OnInit {
  @Input() comment:any;

  constructor() { }

  ngOnInit(): void {
  }

}
