import { UserValidators } from './user.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent {
	public mode: string;
	
	constructor(private fb: FormBuilder) {
		this.mode = 'signin';
	}

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

	public loginForm = new FormGroup({
		'username': new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			UserValidators.noSpace
		]),
		'password': new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			UserValidators.noSpace
		]),
		'remember-me': new FormControl()
	});
	
	public get userName() {
		return this.loginForm.get('username');
	}
	
	public get userPass() {
		return this.loginForm.get('password');
	}
	
	public get rememberMe() {
		return this.loginForm.get('remember-me');
	}

	authoriseUser() {
		console.log(this.loginForm);
		return false;
	}

}
