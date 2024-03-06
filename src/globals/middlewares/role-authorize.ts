/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRole } from '@root/globals/constants/roles';
import { Request, NextFunction, Response } from 'express';
import { NotAuthorizedError } from '@root/config/errors/error-handler';

interface CustomRequest extends Request {
  user: any;
}

const roleAuthorize = (...roles: IRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    const userRole = customReq.user.role; // Example: 'admin', 'user', or null
    if (userRole && roles.includes(userRole)) {
      next();
    } else {
      throw new NotAuthorizedError('Unauthorized access');
    }
  };
};

export default roleAuthorize;
