export interface IUser {
  name: string;
  email: string;
  password: string;

  is_deleted: boolean;
  
  chat_list: [];
  
  timestamp: {
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | undefined;
  }
}


export function ValidateBodyForUser(body: any, user: IUser): boolean{
  return (body.user as IUser).name !== undefined && (body.user as IUser).email !== undefined && (body.user as IUser).password !== undefined;
}