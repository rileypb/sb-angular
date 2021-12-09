import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-acceptance-criteria-compare-list',
  templateUrl: './acceptance-criteria-compare-list.component.html',
  styleUrls: ['./acceptance-criteria-compare-list.component.css']
})
export class AcceptanceCriteriaCompareListComponent implements OnInit {
  @Input() acceptanceCriteria:any;
  @Input() acceptanceCriteriaAdded:any;
  @Input() acceptanceCriteriaRemoved:any;

  constructor() { }

  ngOnInit(): void {
  }

}
