import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchiveDetailsService } from 'src/app/services/archive-details/archive-details.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-archive-details',
  templateUrl: './archive-details.component.html',
  styleUrls: ['./archive-details.component.css']
})
export class ArchiveDetailsComponent implements OnInit {
	photos: any[];
	private photoList: any[];
	showLoader = true;
	message: string;
	constructor(private route: ActivatedRoute, private router: Router, private service: ArchiveDetailsService) { }
	
	ngOnInit() {

		combineLatest(this.route.paramMap, this.route.queryParamMap)
		.pipe(switchMap( paramMap => {
			let albumId = paramMap[0].get('albumId');
			let page = paramMap[1].get('page');
			
			return this.service.getPhotos(Number(albumId));
		})
		)
		.subscribe(user => {
			this.photos = this.photoList = user;
			this.showLoader = false;
		});
	}
	
	search(keyword) {
		let searchItem: string = keyword.value;
		
		if(!searchItem){
			this.photos = this.photoList;
		} else {
			this.photos = this.photoList.filter( item => {
				return (item.title as string).toLowerCase().includes(searchItem);
			});
		}
	}

	showDetails(album) {
		this.service.changeMessage(album);
		this.router.navigate(['/photos', album.id]);
		return false;
	}
}
