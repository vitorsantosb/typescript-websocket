import bcryptjs from 'bcryptjs';
import {ApiLogMessage, ErrorLogMessage, WarningLogMessage} from "@configs/logs/logMessages";

export async function VerifyHashPassword(_password: string, _passwordToCompare: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		bcryptjs.compare(_password, _passwordToCompare, (err, result) => {
			if (err) {
				reject(err);
			}
			if (!result) {
				WarningLogMessage('[SECURITY]', 'Wrong user password');
				reject(false);
			}
			if (result) {
				resolve(true);
			}
		})
	})
}

export async function CreateHashPassword(_password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		bcryptjs.genSalt(10, async function(err, salt) {
			bcryptjs.hash(_password, salt, async function (err, hash) {
				if (err) {
					ErrorLogMessage('[SECURITY]', 'Failure to generate hash for user password');
					reject(err);
				}
				resolve(hash);
			});
		})
	})
}