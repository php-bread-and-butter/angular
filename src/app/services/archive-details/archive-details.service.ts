import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveDetailsService extends DataService {
  private baseUrl = environment.apiUrl;
  private sharedAlbum = new BehaviorSubject<any>({});
  
  currentMessage = this.sharedAlbum.asObservable();

  constructor(private provider: Http) {
    super('photos', provider);
  }

  getPhotos(albumId: number) {
    return this.provider.get(this.baseUrl+'photos?albumId='+albumId)
		.pipe(map( response => response.json() ), catchError(this.handleError));
  }

  changeMessage(msg: any) {
    this.sharedAlbum.next(msg);
  }
}
