import {GetDatabase} from "@database/database";
import {IUser} from "@routes/user/repository/dto/user.interface";
import {ObjectId} from "mongodb";


export class UserRepository {
	async StoreUser(user: IUser) {
		const {collections} = await GetDatabase();
		
		return collections.users.insertOne(JSON.parse(JSON.stringify(user)));
	}
	
	async GetUser(_id: ObjectId) {
		const {collections} = await GetDatabase();
		
		return collections.users.findOne({
			'_id': _id
		});
	}
	
	async ExistsUserWithEmail(email: string) {
		const {collections} = await GetDatabase();
		
		return collections.users.findOne({
			'email': email
		});
	}
}


