import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '@root/config/env/config';
import { tokenTypes } from '@root/globals/constants/tokens';
import { comparePassword, signJWT } from '@root/globals/jwt/services';
import { findUserByEmailOrUsername } from '@root/features/users/services/auth.service';
import { NotAuthorizedError, NotFoundError } from '@root/config/errors/error-handler';

const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  // Check if the user exists and account is active
  const user = await findUserByEmailOrUsername(email);
  if (!user) throw new NotFoundError('Invalid credentials');
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throw new NotAuthorizedError('Invalid credentials');
  if (!user.isActive) throw new NotAuthorizedError('Please activate your account to login');
  // Generate JWT token
  const accessToken = signJWT({ _id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: '6h',
    audience: tokenTypes.ACCESS_TOKEN
  });
  const refreshToken = signJWT({ _id: user._id, role: user.role }, config.REFRESH_JWT_SECRET, {
    expiresIn: '7d',
    audience: tokenTypes.REFRESH_TOKEN
  });
  user.token = refreshToken;
  user.isLogged = true;
  await user.save();
  res.status(StatusCodes.OK).json({ accessToken, refreshToken });
};

export default signin;
