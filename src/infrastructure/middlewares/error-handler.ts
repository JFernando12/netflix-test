import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';
import response from '../network/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return response.error(req, res, err.statusCode, err.message);
  }
  console.error(err);

  response.error(req, res, 500, 'Internal server error');
};
