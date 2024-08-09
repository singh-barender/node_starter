import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyActivationToken } from '@root/globals/jwt/services';
import { BadRequestError } from '@root/config/errors/globalErrors';

interface ActivationRequestBody {
  token: string;
}

// Using `Record<string, never>` to represent an empty object
const accountActivation = async (req: Request<Record<string, never>, unknown, ActivationRequestBody>, res: Response): Promise<Response> => {
  const isValidToken: boolean = await verifyActivationToken(req.body.token);
  if (!isValidToken) throw new BadRequestError('Invalid or expired activation token');
  return res.status(StatusCodes.OK).json({ message: 'Account activated successfully' });
};

export default accountActivation;
