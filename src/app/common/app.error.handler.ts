import { ErrorHandler } from '@angular/core';
import { AppError } from './app.error';
import { NotFoundError } from './not.found.error';

export class AppErrorHandler implements ErrorHandler {
	handleError(error: AppError) {
		if (error instanceof NotFoundError) 
		{
			alert('404, Page not found')
		} 
		else 
		{
			alert('An Unexpected error occured.')
			console.log(error)
		}
	}
}