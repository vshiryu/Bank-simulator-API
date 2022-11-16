export interface IUserRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface IUserResponse {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
  memberSince: Date;
}

export interface IUserLogin {
  username: string;
  password: string;
}
