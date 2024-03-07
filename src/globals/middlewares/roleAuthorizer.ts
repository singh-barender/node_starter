import { IRole } from '@root/globals/constants/roles';
import { Request, NextFunction, Response } from 'express';
import { NotAuthorizedError } from '@root/config/errors/globalErrors';

interface CustomRequest extends Request {
  user: {
    role: IRole;
  };
}

const roleAuthorizer = (...roles: IRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    const userRole = customReq.user.role;
    if (userRole && roles.includes(userRole)) {
      next();
    } else {
      throw new NotAuthorizedError('Unauthorized access');
    }
  };
};

export default roleAuthorizer;
