import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor(private router: Router, private authService: AuthService) { }
	
	canActivate (route, state: RouterStateSnapshot) {
		
		if(this.authService.currentUser() == null) {
			this.router.navigate(['/login'], {queryParams: {redirect: state.url} });
			return false;
		}

		return true;
	}
}
