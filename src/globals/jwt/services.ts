import { IUser } from '@root/types/userTypes';
import { randomBytes, createHash } from 'crypto';
import { compare, genSalt, hash } from 'bcryptjs';
import { Secret, SignOptions, sign } from 'jsonwebtoken';
import { findAndUpdateById, findOneByField } from '@root/features/users/services/auth.service';

const generateActivationToken = async (userId: string): Promise<string> => {
  const randomBytesBuffer: Buffer = randomBytes(20);
  const randomCharacters: string = randomBytesBuffer.toString('hex');
  const confirmToken: string = createHash('sha256').update(randomCharacters).digest('hex');
  await findAndUpdateById(userId, { $set: { token: confirmToken, expires: Date.now() * 60 * 60 * 1000 } });
  return confirmToken;
};

const verifyActivationToken = async (token: string): Promise<boolean> => {
  const user: IUser | null = await findOneByField({ token });
  if (!user || user.expires < Date.now()) return false;
  await findAndUpdateById(user._id as string, { $set: { token: null, expires: null, isActive: true } });
  return true;
};

const verifyResetPasswordToken = async (token: string): Promise<{ _id: string; success: boolean } | boolean> => {
  const user: IUser | null = await findOneByField({ token });
  if (!user || user.expires < Date.now()) return false;
  return { _id: user?._id as string, success: true };
};

const generateHashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword);
};

const signJWT = (payload: { _id: string }, secretKeyOrPrivateKey: string, signingOptions?: SignOptions): string => {
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

export { generateActivationToken, verifyActivationToken, verifyResetPasswordToken, generateHashPassword, comparePassword, signJWT };
