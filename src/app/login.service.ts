import { Injectable } from '@angular/core';
import { User } from './user';
import { Api } from './api';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { ActionCableService } from './actioncable.service';

@Injectable()
export class LoginService {
  user: any;
  status:ReplaySubject<any> = new ReplaySubject<any>(1);
  error: string;
  lastValue:any = null;

  constructor(private api: Api, private router: Router, private cableService: ActionCableService, private auth:AuthService) {
    this.status.next('pending');
    this.auth.user$.subscribe(value => {
      if (value == this.lastValue) return;
      if (value) {
        this.status.next('logged_in');
      } else {
        this.status.next('logged_out');
      }
      this.lastValue = value;
    })
  }

  login(): void {
    // window.location.href = `${environment.apiBaseUrl}/users/sign_in`;
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: document.location.origin });
  }

}

