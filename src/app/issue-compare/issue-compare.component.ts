import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sb-issue-compare',
    templateUrl: './issue-compare.component.html',
    styleUrls: ['./issue-compare.component.css'],
    standalone: false
})
export class IssueCompareComponent implements OnInit {
  @Input() issue:any;

  constructor() { }

  ngOnInit(): void {
  }

}
