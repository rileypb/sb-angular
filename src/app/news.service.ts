import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private api:Api) { }

  readAll() {
  	this.api.post(`api/news/readAll`).subscribe();
  }
}
