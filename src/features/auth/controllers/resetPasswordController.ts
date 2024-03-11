/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@root/config/errors/globalErrors';
import { findAndUpdateById } from '@root/features/users/services/authService';
import { generateHashPassword, verifyResetPasswordToken } from '@root/globals/jwt/services';

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const isValidToken = await verifyResetPasswordToken(req.body.token as string);
  if (!isValidToken || typeof isValidToken !== 'object' || !('_id' in isValidToken)) {
    throw new BadRequestError('Invalid token request');
  }
  const { _id: userId } = isValidToken as { _id: string };
  const newPassword = await generateHashPassword(req.body.password as string);
  // Update user with new password and remove token
  await findAndUpdateById(userId, { $set: { token: null, expires: null, isActive: true, password: newPassword } });
  res.status(StatusCodes.OK).json({ message: 'Account password updated.' });
};

export default resetPassword;
