import { ArchiveService } from './../../services/archive/archive.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-archive',
	templateUrl: './archive.component.html',
	styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
	albums: any[];
	private albumList: any[];
	showLoader = true;
	constructor(private route: ActivatedRoute, private service: ArchiveService) { }
	
	ngOnInit() {
		// Get Parameter from URL
		/* this.route.paramMap
		.subscribe(params => {
			params.get('id');
		}); */

		// Technique 1 
		/* 
		combineLatest(this.route.paramMap,this.route.queryParamMap)
		.subscribe(paramMap => {
			let id = paramMap[0].get('id');
			let page = paramMap[1].get('page');
			
			this.service.getAll()
			.subscribe(user => this.users = user);
		}); 
		*/
		
		// Technique 2
		combineLatest(this.route.paramMap, this.route.queryParamMap)
		.pipe(switchMap( paramMap => {
			return this.service.getAll();
		})
		)
		.subscribe(user => {
			this.albums = this.albumList = user;
			this.showLoader = false;
		});
	}	
	
	search(keyword) {
		let searchItem: string = keyword.value;
		
		if(!searchItem){
			this.albums = this.albumList;
		} else {
			this.albums = this.albumList.filter( item => {
				return (item.title as string).toLowerCase().includes(searchItem);
			});
		}
	}
}
