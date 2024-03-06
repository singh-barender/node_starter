import { IUser } from '@root/types/user.types';
import { randomBytes, createHash } from 'crypto';
import { compare, genSalt, hash } from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import UserModel from '@root/features/users/models/user.model';

export const generateActivationToken = async (userId: string): Promise<string> => {
  const randomBytesBuffer: Buffer = randomBytes(20);
  const randomCharacters: string = randomBytesBuffer.toString('hex');
  const confirmToken: string = createHash('sha256').update(randomCharacters).digest('hex');
  await UserModel.findByIdAndUpdate(userId, { token: confirmToken, expires: Date.now() * 60 * 60 * 1000 });
  return confirmToken;
};

export const verifyActivationToken = async (token: string): Promise<boolean> => {
  const user: IUser | null = await UserModel.findOne({ token });
  if (!user || user.expires < Date.now()) return false;
  await UserModel.findByIdAndUpdate(user._id, { token: null, expires: null, isActive: true });
  return true;
};

export const generateHashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const signJWT = (payload: { _id: string }, secretKeyOrPrivateKey: string): string => {
  const defaultSigningOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '24h', // expiration time
    issuer: 'node_ts', // issuer
    audience: 'node_ts' // audience
  };
  const options: SignOptions = {
    ...defaultSigningOptions
  };
  return jwt.sign(payload, secretKeyOrPrivateKey as Secret, options);
};
