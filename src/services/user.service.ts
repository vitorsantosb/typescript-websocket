import validator from 'email-validator';

export function ValidateUserEmail(email: string): boolean {
	return validator.validate(email);
}