import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-acceptance-criterion-compare',
  templateUrl: './acceptance-criterion-compare.component.html',
  styleUrls: ['./acceptance-criterion-compare.component.css']
})
export class AcceptanceCriterionCompareComponent implements OnInit {
  @Input() acceptanceCriterion:any;

  constructor() { }

  ngOnInit(): void {
  }

}
