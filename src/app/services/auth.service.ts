import { HttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService extends DataService {
	
	constructor(private httpClient: Http, private httpAuth: HttpClient) {
		super('/users', httpClient);
	}
	
	login(credentials: any[]) {		
		return this.httpAuth.post('/api/authenticate', JSON.stringify(credentials))
		.pipe(map((response: any) => {
			let result = response;
			
			if(result && result.token){
				localStorage.setItem('token', result.token);
				return true;
			}

			return false;
		}), catchError(this.handleError));
	}
	
	logout() {
		localStorage.removeItem('token');
	}
	
	isLoggedIn() {
		let jwtHelper = new JwtHelperService();
		let token = localStorage.getItem('token');

		if(!token)
			return false;

		let expirationDate = jwtHelper.getTokenExpirationDate(token);
		let isExpired = jwtHelper.isTokenExpired(token);

		return !isExpired;
	}

	currentUser() {
		let token = localStorage.getItem('token');
		if(!token)
			return null;
			
		return new JwtHelperService().decodeToken(token);
	}
}
