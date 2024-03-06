import { config } from '@root/config';
import { Request, Response } from 'express';
import { sendEmail } from '@root/globals/email';
import { StatusCodes } from 'http-status-codes';
import { generateActivationToken } from '@root/globals/jwt/services';
import { BadRequestError } from '@root/globals/helpers/error-handlers';
import { accountActivationTemplate } from '@root/globals/templates/accountActivation';
import { createNewUser, findUserByEmailOrUsername } from '@root/features/auth/services/auth.service';

const signup = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  // check if user exists
  const existingUser = await findUserByEmailOrUsername(email, username);
  if (existingUser) throw new BadRequestError('Username or email already exists');
  // create new record
  const newUser = await createNewUser(req.body);
  // create activation link
  const activationToken = await generateActivationToken(newUser._id);
  const activationLink = `${config.CLIENT_URL}/account-activation?token=${activationToken}`;
  const template: string = accountActivationTemplate(activationLink);
  // send as email
  await sendEmail(email, 'Activate you account', template);
  res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
};

export default signup;
