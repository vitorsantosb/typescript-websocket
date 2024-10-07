import {IUser} from "./dto/user.interface";
import {prisma} from '@database/prisma.database';


async function StoreUser(user: IUser) {
	return prisma.user.create(
		{
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				password: user.password,
				chat_rooms: {connect: []}
			}
		}
	)
}

async function GetUser(_id: string) {
	return prisma.user.findUnique({
		where: {
			id: _id
		}
	});
}

async function GetUserDataWithEmail(_email: string) {
	return prisma.user.findUnique({
		where: {
			email: _email
		}
	})
}

async function ExistsUserWithEmail(_email: string) {
	return prisma.user.findUnique({
		where: {
			email: _email
		}
	})
}

async function RegisterUserSession(_id: string, _sessionData: any) {

}

export {
	RegisterUserSession,
	StoreUser,
	ExistsUserWithEmail,
	GetUser,
	GetUserDataWithEmail
}

