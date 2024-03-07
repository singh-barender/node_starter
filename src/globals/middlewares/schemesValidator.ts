import { AnySchema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@root/config/errors/globalErrors';

export const schemesValidator = (schema: AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) throw new BadRequestError(getErrorMessage(error));
      next();
    } catch (error) {
      next(error);
    }
  };
};

function getErrorMessage(error: ValidationError): string {
  return error.details.map((detail) => detail.message).join(', ');
}
