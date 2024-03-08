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

// eslint-disable-next-line
export const findOneByField = async (args: any): Promise<IUser | null> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await UserModel.findOne(args);
};

// eslint-disable-next-line
export const findAndUpdateById = async (userId: string, updateData: any): Promise<IUser | null> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

export async function createNewUser(userData: IRegisterUser) {
  return await UserModel.create(userData);
}
