import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyActivationToken } from '@root/globals/jwt/services';
import { BadRequestError } from '@root/config/errors/globalErrors';

const accountActivation = async (req: Request, res: Response): Promise<Response> => {
  const isValidToken: boolean = await verifyActivationToken(req.body.token as string);
  if (!isValidToken) throw new BadRequestError('Invalid or expired activation token');
  return res.status(StatusCodes.OK).json({ message: 'Account activated successfully' });
};

export default accountActivation;
