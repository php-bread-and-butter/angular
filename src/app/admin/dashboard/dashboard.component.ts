import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	orders: any[];
	constructor(private service: OrdersService) { }
	
	ngOnInit() {
		this.service.getOrders()
		.subscribe((response: any) => {
			this.orders = response;
		});
	}
	
}
