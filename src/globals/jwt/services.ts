import { randomBytes, createHash } from 'crypto';
import UserModel from '@root/features/users/models/user.model';
import { IUser } from '@root/types/user.types';

export const generateActivationToken = async (userId: string): Promise<string> => {
  const randomBytesBuffer: Buffer = randomBytes(20);
  const randomCharacters: string = randomBytesBuffer.toString('hex');
  const confirmToken: string = createHash('sha256').update(randomCharacters).digest('hex');
  await UserModel.findByIdAndUpdate(userId, { token: confirmToken, expires: Date.now() * 60 * 60 * 1000 });
  return confirmToken;
};

export const verifyActivationToken = async (token: string): Promise<boolean> => {
  const user: IUser | null = await UserModel.findOne({ token });
  // If user not found or token is expired, return false
  if (!user || user.expires < Date.now()) return false;
  return true;
};
