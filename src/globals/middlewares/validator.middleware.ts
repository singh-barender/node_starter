import { AnySchema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@root/globals/helpers/error-handlers';

export const joiValidator = (schema: AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (!error) {
        next();
      } else {
        const message = getErrorMessage(error);
        next(new BadRequestError(message));
      }
    } catch (error) {
      next(error);
    }
  };
};

function getErrorMessage(error: ValidationError): string {
  return error.details.map((detail) => detail.message).join(', ');
}
