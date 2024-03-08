import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  gender: string;
  city: string;
  country: string;
  createdOn: Date;
  token: string;
  expires: number;
  isActive: boolean;
  isLogged: boolean;
  role: string;
}

export interface IUserSubset {
  _id?: string;
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  city: string;
  country: string;
  createdOn: Date;
  token: string;
  expires: number;
  isActive: boolean;
  isLogged: boolean;
}

export interface IRegisterUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserSubset = Pick<IUser, '_id' | 'username' | 'firstName' | 'lastName' | 'role' | 'email'>;
