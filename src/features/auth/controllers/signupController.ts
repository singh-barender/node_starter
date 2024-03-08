import { Request, Response } from 'express';
import { sendEmail } from '@root/globals/email';
import { StatusCodes } from 'http-status-codes';
import { config } from '@root/config/env/config';
import { IRegisterUser } from '@root/types/userTypes';
import { saveUserToCache } from '@root/globals/redis/userCache';
import { BadRequestError } from '@root/config/errors/globalErrors';
import { accountActivationTemplate } from '@root/globals/templates/accountActivation';
import { generateActivationToken, generateHashPassword } from '@root/globals/jwt/services';
import { createNewUser, findUserByEmailOrUsernameSeparately } from '@root/features/users/services/auth.service';

const signup = async (req: Request<unknown, unknown, IRegisterUser, unknown>, res: Response): Promise<void> => {
  const { email, username, password, ...otherProps } = req.body;
  const existingUser = await findUserByEmailOrUsernameSeparately(email, username);
  if (existingUser) throw new BadRequestError('Username or email already exists');
  // Generate hashed password
  const hashedPassword = await generateHashPassword(password);
  const newPayload: IRegisterUser = { email, username, password: hashedPassword, ...otherProps };
  // Create new user record
  const newUser = await createNewUser(newPayload);
  // Save user to cache
  await saveUserToCache(newUser);
  // Generate activation token
  const activationToken = await generateActivationToken(newUser._id as string);
  const activationLink = `${config.CLIENT_URL}/account-activation?token=${activationToken}`;
  const template: string = accountActivationTemplate(activationLink);
  // Send activation email
  await sendEmail(email, 'Activate your account', template);
  res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
};

export default signup;
