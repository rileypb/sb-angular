import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { CableService } from './cable.service';

@Injectable()
export class LoginService {
  user: any;
  status: string = 'pending';
  error: string;

  constructor(private http: HttpClient, private router: Router, private cableService: CableService) { }


  // init() : void {
  //  this.redirectForLogin(null);
  // }

  init() : Observable<string> {
   return this.checkLoginStatus();
    
  }

  checkLoginStatus() : Observable<string> {
    this.error = null;
    return new Observable(subscriber => {
      this.http.get("api/me").subscribe(
        succ => {
          this.user = succ;
          if (!this.user) {
              this.status = 'logged_out';
          } else {
              this.status = 'logged_in';
          }
          subscriber.next(this.status);
          subscriber.complete();
        },
        err => {
          this.error = err.message;
          this.status = 'error';
          subscriber.next(this.status);
          subscriber.complete();
        }
      );
    });
  }

  login(): void {
    window.location.href = '/users/sign_in';
  }

  logout(): void {
    window.location.href = '/users/sign_out';
  }

}

