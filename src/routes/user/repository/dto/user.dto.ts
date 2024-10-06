import {IUser} from '@routes/user/repository/dto/user.interface';
import {ObjectId} from "mongodb";

export function CreateUserDto(_username: string, _email: string, _hashPassword: string): IUser {
	return {
		name: _username,
		email: _email,
		password: _hashPassword,
		is_deleted: false,
    chat_list: [],
		timestamp: {
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: undefined,
		},
	}
}