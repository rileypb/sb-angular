import { Component, OnInit } from '@angular/core';
import { Base } from '../base';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends Base implements OnInit {
  public user:Observable<any>;

  constructor(private route:ActivatedRoute, private dataService:DataService) {
    super();
  }

  ngOnInit(): void {
    this.dataService.load('user_profile', ['user_profile']);
    this.user = this.dataService.values['user_profile'];
  }

  ngOnDestroy() {
    this.dataService.unload('user_profile', ['user_profile']);
  }

}
