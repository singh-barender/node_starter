import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyActivationToken } from '@root/globals/jwt/services';
import { BadRequestError } from '@root/globals/helpers/error-handlers';

const activateAccount = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.body;
  const isValidToken: boolean = await verifyActivationToken(token);
  if (!isValidToken) throw new BadRequestError('Invalid or expired activation token');
  return res.status(StatusCodes.OK).json({ message: 'Account activated successfully' });
};

export default activateAccount;
