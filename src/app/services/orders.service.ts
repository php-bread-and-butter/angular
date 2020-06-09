import { JwtModule } from '@auth0/angular-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OrdersService extends DataService {
	
	constructor(private authHttp: Http, private httpClient: HttpClient) {
		super('orders', authHttp);
	}
	
	getOrders() {
		/* // Technique One
		let token = localStorage.getItem('token');
		let header = new Headers();
			header.append('Authorization', 'Bearer '+token);

		let options = new RequestOptions({headers: header});
		return this.authHttp.get('/api/orders', options)
		.pipe(map(response => response)); 
		*/
		
		
		return this.httpClient.get('/api/orders')
		.pipe(map(response => response));

	}
}
