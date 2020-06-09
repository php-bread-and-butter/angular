import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArchiveDetailsService } from 'src/app/services/archive-details/archive-details.service';
import { combineLatest, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
	photo = {
		albumId : '',
		id : '',
		title : '',
		url : '',
		thumbnailUrl : ''
	};	
	showLoader = true;
	constructor(private route: ActivatedRoute, private service: ArchiveDetailsService) { }
	
	ngOnInit() {
		/* combineLatest(this.route.paramMap)
		.pipe(switchMap( paramMap => {
			let id = paramMap[0].get('id');
			return this.service.get(Number(id));
		})
		)
		.subscribe(response => {
			this.photo = response;
			this.showLoader = false;
		}); */
		
		/* 
		combineLatest(this.route.paramMap)
		.pipe(switchMap(paramMap => {
				let id = paramMap[0].get('id');
				return this.service.currentMessage;
			})
		)
		.subscribe(photo => {
			if(Object.keys(photo).length > 0)
			this.photo = photo;
			else {
				this.service.get(Number(id))
			}
			console.log(photo)
		}); */
		
		this.service.currentMessage
		.subscribe(photo => {
			if(Object.keys(photo).length > 0) {
				this.photo = photo;
			} else {
				combineLatest(this.route.paramMap)
				.pipe(switchMap( paramMap => {
					let id = paramMap[0].get('id');
					return this.service.get(Number(id));
				})
				)
				.subscribe(response => {
					this.photo = response;
					this.showLoader = false;
				});
			}
		});
	}
}
		