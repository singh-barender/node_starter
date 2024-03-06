import { config } from '@root/config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, signJWT } from '@root/globals/jwt/services';
import { findUserByEmailOrUsername } from '@root/features/auth/services/auth.service';
import { NotAuthorizedError, NotFoundError } from '@root/globals/helpers/error-handlers';

const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  // Check if the user exists and account is active
  const user = await findUserByEmailOrUsername(email);
  if (!user) throw new NotFoundError('Invalid credentials');
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throw new NotAuthorizedError('Invalid credentials');
  if (!user.isActive) throw new NotAuthorizedError('Please activate your account to login');
  // Generate JWT token
  const token = signJWT({ _id: user._id }, config.JWT_TOKEN);
  user.token = token;
  user.isLogged = true;
  await user.save();
  res.status(StatusCodes.OK).json({ token });
};

export default signin;
