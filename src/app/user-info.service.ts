import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  public user:ReplaySubject<any> = new ReplaySubject<any>(1);
  public token:ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private auth:AuthService) { 
  	auth.user$.subscribe(x => 
  		{
  			//console.log(JSON.stringify(x));
  			this.user.next(x);
  		});
  	auth.idTokenClaims$.subscribe(x => 
  		{
  			//console.log(JSON.stringify(x));
  			this.token.next(x);
  		});
  }

}
