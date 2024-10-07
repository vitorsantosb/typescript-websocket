export interface IChatRoomData {
	user_id: string;
	message: string;
	data: Date;
}

export interface IChatModel {
	room_id: string;
	room_members: [];
	room_data: IChatRoomData[];
}