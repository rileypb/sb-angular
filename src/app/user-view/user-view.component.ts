import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input() user:User;
  @Input() icon:boolean = false;
  @Input() placeholder:string;

  constructor() { }

  ngOnInit(): void {
  }

}
