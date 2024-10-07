import {Request, Response} from 'express';
import GetApiUrl from '@services/url.service';
import {NormalizeEmail} from '@services/email.service';
import {ExistsUserWithEmail, GetUserDataWithEmail} from '@repository/user.repository';
import {IPayload} from '@security/interfaces/jwt-interfaces';
import {CreateUserPayload} from '@repository/dto/user.dto';
import {CreateUserAccessToken} from '@security/jwt-utils';
import {VerifyHashPassword} from '@security/encryption-utils';

export const login = async (req: Request, res: Response) => {
	const {email, password} = req.body;
	
	if(!email && !password) {
		res.status(422).send({
			message: 'Email or password not found - Missing entity',
			statusCode: 422,
			request: {
				method: 'POST',
				message: 'Try to login - missing information',
				url: `${GetApiUrl()}/auth/login`
			}
		});
	}
	const normalizedEmail = NormalizeEmail(email);
	
	if(await ExistsUserWithEmail(normalizedEmail)){
		const user = await GetUserDataWithEmail(normalizedEmail);
		
		if(!user){
			throw new Error('Failure to fetch user');
		}
		
		if(await VerifyHashPassword(password, user.password)) {
			if (user) {
				const userPayload: IPayload = CreateUserPayload({
					id: user.id,
					name: user.name,
					email: user.email,
				});
				
				const accessToken = await CreateUserAccessToken(userPayload);
				
				return res.status(200).send({
					message: 'Successfully',
					statusCode: 200,
					request: {
						method: 'POST',
						message: 'Successfully user has been logged in',
						url: `${GetApiUrl()}/user/login`
					},
					token: accessToken,
				})
			}
		} else {
			return res.status(401).send({
				message: 'Unauthorized',
				statusCode: 401,
				request: {
					method: 'POST',
					message: 'Unauthorized - Wrong Password',
					url: `${GetApiUrl()}/auth/login`
				}
			})
		}
	}
}