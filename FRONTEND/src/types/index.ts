export interface DecodedToken {
  UserInfo: {
    id: string;
    username: string;
    roles: string[];
  },
}

export interface INote {
  _id: string;
  id: string;
  user: IUserNote
  title: string;
  text: string;
  completed: false;
  createdAt: string;
  updatedAt: string;
  ticket: number;
}

export interface IUserNote {
  _id: string;
  username: string;
}

export interface IUser {
  _id: string;
  id: string;
  username: string;
  roles: string[];
  active: boolean;
}