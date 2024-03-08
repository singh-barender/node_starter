import { Request, Response } from 'express';
import { IUser } from '@root/types/userTypes';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '@root/config/errors/globalErrors';
import { findById } from '@root/features/users/services/auth.service';

const signout = async (req: Request, res: Response): Promise<void> => {
  req.session = null;
  const userId = (req.user as IUser)?._id;
  const user = await findById(userId as string);
  if (!user) throw new NotFoundError('User not found');
  user.token = '';
  user.isLogged = false;
  await user.save();
  res.status(StatusCodes.OK).json({ message: 'Signed out successfully' });
};

export default signout;
