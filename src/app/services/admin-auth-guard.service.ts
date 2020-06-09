import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

	constructor(private router: Router, private authService: AuthService) { }

	canActivate(){
		let user = this.authService.currentUser();
		if(user) {
			if(user.admin === false) {
				this.router.navigate(['/no-access']);
				return false;
			}
			return true;
		} else {
			return false;
		}
		
	}
}
