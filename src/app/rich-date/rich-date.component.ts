import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rich-date',
  templateUrl: './rich-date.component.html',
  styleUrls: ['./rich-date.component.css']
})
export class RichDateComponent implements OnInit {
  @Input() date: string;

  constructor() { }

  ngOnInit(): void {
  }

}
