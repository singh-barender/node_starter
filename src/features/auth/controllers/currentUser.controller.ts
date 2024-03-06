import { Request, Response } from 'express';
import { IUser } from '@root/types/user.types';
import { StatusCodes } from 'http-status-codes';
import { sanitizeAndPrepareUser } from '@root/globals/helpers';
import { NotAuthorizedError } from '@root/config/errors/error-handler';

const currentUser = async (req: Request, res: Response): Promise<Response> => {
  const user: IUser | undefined = req.user as IUser | undefined;
  if (!user) throw new NotAuthorizedError('User not authenticated');
  const sanitizedUser = sanitizeAndPrepareUser(user);
  return res.status(StatusCodes.OK).json({ ...sanitizedUser });
};

export default currentUser;
