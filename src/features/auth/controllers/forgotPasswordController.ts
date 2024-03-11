import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendEmail } from '@root/globals/email';
import { config } from '@root/config/env/config';
import { NotFoundError } from '@root/config/errors/globalErrors';
import { generateActivationToken } from '@root/globals/jwt/services';
import { resetPasswordTemplate } from '@root/globals/templates/resetPassword';
import { findUserByEmailOrUsername } from '@root/features/users/services/authService';

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const existingUser = await findUserByEmailOrUsername(req.body.email as string);
  if (!existingUser) throw new NotFoundError('User with this email does not exist.');
  // Generate reset password token
  const resetPasswordToken = await generateActivationToken(existingUser._id as string);
  const activationLink = `${config.CLIENT_URL}/reset-password?token=${resetPasswordToken}`;
  const template: string = resetPasswordTemplate(activationLink);
  // Send activation email
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await sendEmail(req.body.email as string, 'Reset your password', template);
  res.status(StatusCodes.OK).json({ message: 'Email has been sent successfully' });
};

export default forgotPassword;
