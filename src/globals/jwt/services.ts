import { IUser } from '@root/types/user.types';
import { randomBytes, createHash } from 'crypto';
import { compare, genSalt, hash } from 'bcryptjs';
import { Secret, SignOptions, sign } from 'jsonwebtoken';
import { findAndUpdateById, findOneByField } from '@root/features/users/services/auth.service';

export const generateActivationToken = async (userId: string): Promise<string> => {
  const randomBytesBuffer: Buffer = randomBytes(20);
  const randomCharacters: string = randomBytesBuffer.toString('hex');
  const confirmToken: string = createHash('sha256').update(randomCharacters).digest('hex');
  await findAndUpdateById(userId, { token: confirmToken, expires: Date.now() * 60 * 60 * 1000 });
  return confirmToken;
};

export const verifyActivationToken = async (token: string): Promise<boolean> => {
  const user: IUser | null = await findOneByField({ token });
  if (!user || user.expires < Date.now()) return false;
  await findAndUpdateById(user._id, { token: null, expires: null, isActive: true });
  return true;
};

export const verifyResetPasswordToken = async (token: string): Promise<{ _id: string; success: boolean } | boolean> => {
  const user: IUser | null = await findOneByField({ token });
  if (!user || user.expires < Date.now()) return false;
  return { _id: user?._id, success: true };
};

export const generateHashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const signJWT = (payload: { _id: string; role: string }, secretKeyOrPrivateKey: string, signingOptions?: SignOptions): string => {
  const defaultSigningOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '24h', // expiration time
    issuer: 'node_ts', // issuer
    audience: signingOptions?.audience // audience
  };
  const options: SignOptions = {
    ...defaultSigningOptions,
    ...signingOptions
  };
  return sign(payload, secretKeyOrPrivateKey as Secret, options);
};
