import { pipe } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserValidators } from 'src/app/components/user/user.validators';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
	mode: string = 'signin';
	invalidLogin: boolean;
	constructor(
		private fb: FormBuilder, 
		private router: Router, 
		private authService: AuthService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		if(this.authService.currentUser()) {
			this.router.navigate(['/']);
			return false;
		}
	}
	
	loginForm = this.fb.group({
		'email' : [
			'', 
			[
				Validators.required,
				UserValidators.noSpace,
				Validators.email
			]
		],
		'password': [
			'', 
			[
				Validators.required,
				Validators.minLength(3),
				UserValidators.noSpace
			]
		],
		'remember-me': ['']
	});

	public get userEmail() {
		return this.loginForm.get('email');
	}
	
	public get userPass() {
		return this.loginForm.get('password');
	}
	
	public get rememberMe() {
		return this.loginForm.get('remember-me');
	}
	
	signIn() {
		let credentials = this.loginForm.value;
		this.authService.login(credentials)
		.subscribe(result => {
			if(result){
				let redirectUrl = this.route.snapshot.queryParamMap.get('redirect');
				this.router.navigate([redirectUrl || '/']);
			}
			else 
				this.invalidLogin = true;
		});
	}
	
	/**
	 * Registration Section
	 */
	public signupForm = this.fb.group({
		'full-name': ['', 
			[
				Validators.required,
				Validators.minLength(3)
			]
		],
		'email-address' : ['', 
			[
				Validators.required,
				Validators.email
			],
			UserValidators.uniqueEmail
		],
		'username': ['', 
			[
				Validators.required,
				Validators.minLength(3),
				UserValidators.noSpace
			], 
			UserValidators.uniqueUsername
		],
		'password': ['', 
			[
				Validators.required,
				Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$')
			]
		],
		'confirm-password': ['', 
			[
				Validators.required
			]
		],
		'agree-term': ['', 
			[
				Validators.required
			]
		]
	}, {
		validator: UserValidators.matchConfirmPassword
	});
	/**
	 * Signup Getter
	 */
	
	public get signupName() {
		return this.signupForm.get('full-name');
	}

	public get signupEmail() {
		return this.signupForm.get('email-address');
	}

	public get signupUsername() {
		return this.signupForm.get('username');
	}

	public get signupPassword() {
		return this.signupForm.get('password');
	}

	public get signupConfirmPassword() {
		return this.signupForm.get('confirm-password');
	}

	public get signupAgreeTerm() {
		return this.signupForm.get('agree-term');
	}

	/**
	 * registration
	 */
	public registration() {
		console.log(this.signupForm);
		return false;
	}
}
