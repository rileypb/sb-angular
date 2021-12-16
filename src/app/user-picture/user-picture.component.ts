import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sb-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.css']
})
export class UserPictureComponent implements OnInit {
  @Input() userId:number;
  @Input() src:string;
  @Input() alt:string;
  @Input() username:string;
  pulsing:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  pulse(): void {
    this.pulsing = false;
    timer(100).pipe(first()).subscribe((x) => {
      this.pulsing = true;
    });
  }
}
