import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = 400;

  res.status(statusCode).json({
    success: false,
    message: 'Validation failed',
    error: err,
  });
};

export default globalErrorHandler;
