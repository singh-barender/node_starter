import { config } from '@root/config';
import { Request, Response } from 'express';
import { sendEmail } from '@root/globals/email';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@root/globals/helpers/error-handlers';
import { accountActivationTemplate } from '@root/globals/templates/accountActivation';
import { generateActivationToken, generateHashPassword } from '@root/globals/jwt/services';
import { createNewUser, findUserByEmailOrUsernameSeparately } from '@root/features/auth/services/auth.service';

const signup = async (req: Request, res: Response): Promise<void> => {
  const existingUser = await findUserByEmailOrUsernameSeparately(req.body.email, req.body.username);
  if (existingUser) throw new BadRequestError('Username or email already exists');
  // Generate hashed password
  const hashedPassword = await generateHashPassword(req.body.password);
  const newPayload = { ...req.body, password: hashedPassword };
  // Create new user record
  const newUser = await createNewUser(newPayload);
  // Generate activation token
  const activationToken = await generateActivationToken(newUser._id);
  const activationLink = `${config.CLIENT_URL}/account-activation?token=${activationToken}`;
  const template: string = accountActivationTemplate(activationLink);
  // Send activation email
  await sendEmail(req.body.email, 'Activate your account', template);
  res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
};

export default signup;
