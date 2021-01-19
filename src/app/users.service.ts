import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  save(user) {
  	return this.http.patch(`api/users/${user.id}`, { user: user });
  }
}
