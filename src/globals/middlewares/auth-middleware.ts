import { config } from '@root/config';
import { IUser } from '@root/types/user.types';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findById } from '@root/features/auth/services/auth.service';
import { NotAuthorizedError } from '@root/globals/helpers/error-handlers';

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ').pop();
    }
    if (!token) return next(new NotAuthorizedError('Not authorized to access this route'));
    const decoded: JwtPayload = verify(token, config.JWT_SECRET) as JwtPayload;
    const user: IUser | null = await findById(decoded._id);
    if (!user) throw new NotAuthorizedError('User not found');
    req.user = user;
  } catch (error) {
    throw new NotAuthorizedError('Token is invalid. Please login again.');
  }
  next();
};

export const checkAuthentication = (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.user) {
    throw new NotAuthorizedError('Authentication is required to access this route.');
  }
  next();
};
