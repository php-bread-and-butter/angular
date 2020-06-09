import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserValidators {
	public static noSpace(control: AbstractControl): ValidationErrors | null {
		if ((control.value as string).indexOf(' ') >= 0) {
			return { noSpace: true};
		}
		return null;
	}

	public static uniqueUsername (control: AbstractControl) : Promise<ValidationErrors | null> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if ((control.value as string) == 'jason') {
					resolve({uniqueUsername: true});
				} else {
					resolve({uniqueUsername: null});
				}
			}, 2000); 
		});
	}

	public static uniqueEmail (control: AbstractControl) : Promise<ValidationErrors | null> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if ((control.value as string) == 'test@gmail.com') {
					resolve({uniquesignupEmail: true});
				} else {
					resolve({uniquesignupEmail: null});
				}
			}, 2000); 
		});
	}
	
	public static matchConfirmPassword(control: AbstractControl): ValidationErrors | null {
		let password = control.get('password').value;
		let confirmPassword = control.get('confirm-password').value;

		if (password !== confirmPassword) {
			return { passwordMismatch: true};
		}
		return { passwordMismatch: null};
	}
}