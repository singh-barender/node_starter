/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, NextFunction, Response } from 'express';
import { IRole } from '@root/globals/constants/roles';
import { NotAuthorizedError } from '@root/globals/helpers/error-handlers';

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
