import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class Api {
	constructor(private http:HttpClient) {
	}

	get(url):Observable<any> {
		return this.http.get(this.mapUrl(url));
	}

	post(url, data = null):Observable<any> {
		return this.http.post(this.mapUrl(url), data);
	}

	patch(url, data = null):Observable<any> {
		return this.http.patch(this.mapUrl(url), data);
	}

	delete(url):Observable<any> {
		return this.http.delete(this.mapUrl(url));
	}

	private mapUrl(url):string {
		return `${environment.apiBaseUrl}/${url}`;
	}
}