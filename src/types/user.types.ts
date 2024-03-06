import { Document } from 'mongoose';

export interface IUser extends Document {
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
