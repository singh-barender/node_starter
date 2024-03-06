import UserModel from '@root/features/users/models/user.model';
import { IUser } from '@root/types/user.types';

export async function findUserByEmailOrUsername(email: string, username: string) {
  return await UserModel.findOne({ $or: [{ username }, { email }] });
}

export async function createNewUser(userData: IUser) {
  return await UserModel.create(userData);
}
