import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function sendResponse<T>(res: Response, data: TResponse<T>) {
  res.status(200).json(data);
}
