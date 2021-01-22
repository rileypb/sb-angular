import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api:Api) { }

  save(user) {
  	return this.api.patch(`api/users/${user.id}`, { user: user });
  }
}
