import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-tshirt-size',
  templateUrl: './tshirt-size.component.html',
  styleUrls: ['./tshirt-size.component.css']
})
export class TshirtSizeComponent implements OnInit {
  @Input() size:number;

  constructor() { }

  ngOnInit(): void {
  }

}
