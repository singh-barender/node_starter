/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRegisterUser, IUser } from '@root/types/userTypes';
import UserModel from '@root/features/users/models/userModel';

export const findUserByEmailOrUsername = async (emailOrUsername: string): Promise<IUser | null> => {
  return await UserModel.findOne({ $or: [{ username: emailOrUsername }, { email: emailOrUsername }] });
};

export const findUserByEmailOrUsernameSeparately = async (email: string, username: string): Promise<IUser | null> => {
  return await UserModel.findOne({ $or: [{ username }, { email }] })
    .lean()
    .exec();
};

export const findById = async (userId: string): Promise<IUser | null> => {
  return await UserModel.findById(userId);
};

export const findOneByField = async (args: any): Promise<IUser | null> => {
  return await UserModel.findOne(args);
};

export const findAndUpdateById = async (userId: string, updateData: any): Promise<IUser | null> => {
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

export async function createNewUser(userData: IRegisterUser) {
  return await UserModel.create(userData);
}
