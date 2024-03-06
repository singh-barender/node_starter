import { IUser } from '@root/types/user.types';
import UserModel from '@root/features/users/models/user.model';

export const findUserByEmailOrUsername = async (emailOrUsername: string): Promise<IUser | null> => {
  return await UserModel.findOne({ $or: [{ username: emailOrUsername }, { email: emailOrUsername }] });
};

export const findUserByEmailOrUsernameSeparately = async (email: string, username: string): Promise<IUser | null> => {
  return await UserModel.findOne({ $or: [{ username }, { email }] })
    .lean()
    .exec();
};

export async function createNewUser(userData: IUser) {
  return await UserModel.create(userData);
}
