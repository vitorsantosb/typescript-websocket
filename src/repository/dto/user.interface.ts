export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;

  is_deleted: boolean;
  
  chat_list: [];
  sessions: [];
}


export function ValidateBodyForUser(body: any, user: IUser): boolean{
  return (body.user as IUser).name !== undefined && (body.user as IUser).email !== undefined && (body.user as IUser).password !== undefined;
}