import { Http } from '@angular/http';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService extends DataService {

  constructor(http: Http) {
    super('albums', http);
  }
}
