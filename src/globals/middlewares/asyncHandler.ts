import { Response, Request, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next);
  };
};
