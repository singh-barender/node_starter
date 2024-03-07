import { IUser } from '@root/types/user.types';
import { config } from '@root/config/env/config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findById } from '@root/features/users/services/auth.service';
import { NotAuthorizedError } from '@root/config/errors/error-handler';

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ').pop();
    if (!token) throw new NotAuthorizedError('Not authorized to access this route');
    const decoded: JwtPayload = verify(token, config.JWT_SECRET) as JwtPayload;
    const user = await findById(decoded._id);
    if (!user) throw new NotAuthorizedError('User not found');
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid request without token.'));
  }
};

export const checkAuthentication = (req: Request, _res: Response, next: NextFunction): void => {
  if (!(req.user as IUser).token) {
    throw new NotAuthorizedError('Authentication is required to access this route.');
  }
  next();
};
