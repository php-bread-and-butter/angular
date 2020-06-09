import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AppError } from '../common/app.error';
import { BadInputError } from './../common/bad.input.error';
import { NotFoundError } from './../common/not.found.error';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class DataService {
	private url: string;
	
	constructor(private uri: string, private http: Http) {
		this.url = environment.apiUrl+uri;
	}
	
	protected handleError(error: Response) {
		if(error.status === 404)
		{
			return throwError(new NotFoundError());
		}
		else if(error.status === 400)
		{
			return throwError(new BadInputError(error.json()));
		}

		return throwError(new AppError(error));
	}
	
	public getAll() {
		return this.http.get(this.url)
		.pipe(map( response => response.json() ), catchError(this.handleError));
	}
	
	public get(id: number) {
		return this.http.get(this.url+'/'+id)
		.pipe(map( response => response.json() ), catchError(this.handleError));
	}
	
	public create(resource: any) {
		return this.http.post(this.url, JSON.stringify(resource)).pipe(map( response => response.json() ), catchError(this.handleError))
	}
	
	public delete(id: number) {
		return this.http.delete(this.url+'/'+id).pipe(map( response => response.json() ), catchError(this.handleError));
	}
}
