import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, headers, body } = request;
		
		// Admin User
		let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
		// Normal User
		// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6ZmFsc2V9.LBqPKgILN3MwO-IjVfqtzLjv1kLpq4ReXgu653s2eLc';
		
		// wrap in delayed observable to simulate server api call
		return of(null)
		.pipe(mergeMap(handleRoute))
		.pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
		.pipe(delay(500))
		.pipe(dematerialize());
		
		function handleRoute() {
			
			switch (true) {
				case url.endsWith('/api/authenticate') && method === 'POST':
					return authenticate();

				case url.endsWith('/api/orders') && method === 'GET':
					if (!isLoggedIn()) 
						return unauthorized();

					return of(new HttpResponse({
						status: 200, 
						body: [1, 2, 3]
					}));

				default:
					// pass through any requests not handled above
					return next.handle(request);
			}    
		}
		
		// route functions
		
		function authenticate() {
			let body = JSON.parse(request.body);
			if (body.email === 'jason@domain.com' && body.password === '1234') {
				return ok({ token: token });
			} else {
				return ok({ message: 'Username or password is incorrect' });
			}
		}
		
		// helper functions
		
		function ok(body?) {
			return of(new HttpResponse({ status: 200, body }))
		}
		
		function error(message) {
			return throwError({ error: { message } });
		}
		
		function unauthorized() {
			return throwError({ status: 401, error: { message: 'Unauthorised' } });
		}
		
		function isLoggedIn() {
			return headers.get('Authorization') === 'Bearer '+token;
		}
	}
}

export let fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: FakeBackendInterceptor,
	multi: true
};