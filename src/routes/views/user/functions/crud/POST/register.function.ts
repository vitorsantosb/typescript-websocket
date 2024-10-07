import {query, Request, Response} from "express";
import GetApiUrl from "@services/url.service";
import {IUser, ValidateBodyForUser} from "@repository/dto/user.interface";
import {ValidateUserEmail} from "@services/user.service";
import {CreateUserDto} from "@repository/dto/user.dto";
import {CreateHashPassword} from "@security/encryption-utils";
import {ExistsUserWithEmail, StoreUser} from '@repository/user.repository';
import {ApiLogMessage} from '@configs/logs/logMessages';
import {CreateId} from '@configs/uuid/GenUUID';

export const register = async (req: Request, res: Response) => {
	const {user} = req.body;

	if (!ValidateBodyForUser(req.body, user)) {
		return res.status(422).send({
			message: 'Failed to register user - missing information',
			statusCode: 422,
			request: {
				method: 'POST',
				message: 'Try to create new user',
				url: `${GetApiUrl()}/user/register`
			}
		})
	}

	if (!ValidateUserEmail(user.email)) {
		return res.status(400).send({
			message: 'Invalid email address',
			statusCode: 400,
			request: {
				method: 'POST',
				message: 'Try to create new user',
				url: `${GetApiUrl()}/user/register`
			}
		})
	}
	
	if (await ExistsUserWithEmail(user.email)) {
		return res.status(400).send({
			message: 'User already exists',
			statusCode: 400,
			request: {
				method: 'POST',
				message: 'Try to create new user',
				url: `${GetApiUrl()}/user/register`
			}
		})
	}
	const hashPassword: string = await CreateHashPassword(user.password);
	
	const id: string = CreateId();
	const userDto: IUser = CreateUserDto(id, user.name, user.email, hashPassword);
	
	const queryResult = await StoreUser(userDto);
	if (queryResult) {
		return res.status(201).send({
			message: 'Successfully',
			statusCode: 200,
			request: {
				method: 'POST',
				message: 'Successfully registered user on database',
				url: `${GetApiUrl()}/user/register`
			}
		})
	} else {
		return res.status(500).send({
			message: 'Failed to register user',
			statusCode: 500,
			request: {
				method: 'POST',
				message: 'Unable to register user',
				url: `${GetApiUrl()}/user/register`
			},
			error: queryResult
		})
	}
}
