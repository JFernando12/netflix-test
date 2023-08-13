import { Request, Response } from 'express';

const success = (
  req: Request,
  res: Response,
  status: number,
  data: unknown,
  message?: string,
  options?: { offset?: number; limit?: number; count?: number }
) => {
  const statusCode = status || 200;
  const statusMessage = message || '';

  res.status(statusCode).json({
    status: status,
    message: statusMessage,
    ...options,
    data,
  });
};

const error = (
  req: Request,
  res: Response,
  status: number,
  message?: string,
  data?: unknown
) => {
  const statusCode = status || 500;
  const statusMessage = message || 'Internal server error';

  res.status(statusCode).json({
    status: status,
    message: statusMessage,
    data,
  });
};

export default { success, error };
