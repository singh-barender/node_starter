import { Request, Response } from 'express';
import { IUser } from '@root/types/user.types';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '@root/globals/helpers/error-handlers';
import UserModel from '@root/features/users/models/user.model';

const signout = async (req: Request, res: Response) => {
  req.session = null;
  const userId = (req.user as IUser)?._id;
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundError('User not found');
  user.token = '';
  await user.save();
  res.status(StatusCodes.OK).json({ message: 'Signed out successfully' });
};

export default signout;
