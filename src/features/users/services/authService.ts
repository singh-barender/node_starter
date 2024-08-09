import { IRegisterUser, IUser } from '@root/types/userTypes';
import UserModel from '@root/features/users/models/userModel';
import { FilterQuery, UpdateQuery } from 'mongoose';

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

// Update with specific type
export const findOneByField = async (args: FilterQuery<IUser>): Promise<IUser | null> => {
  return await UserModel.findOne(args);
};

// Update with specific type
export const findAndUpdateById = async (userId: string, updateData: UpdateQuery<IUser>): Promise<IUser | null> => {
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

export async function createNewUser(userData: IRegisterUser) {
  return await UserModel.create(userData);
}
