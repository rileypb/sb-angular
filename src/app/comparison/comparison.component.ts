import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  @Input() label:string;
  @Input() old:any;
  @Input() new:any;

  constructor() { }

  ngOnInit(): void {
  }

}
