import { Request, Response, NextFunction } from 'express';
import { BorrowService } from './borrow.service';
import sendResponse from '../../utils/sendResponse';

export const BorrowController = {
  borrowBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BorrowService.borrowBook(req.body);
      sendResponse(res, {
        success: true,
        message: 'Book borrowed successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  getBorrowSummary: async (_req: Request, res: Response) => {
    const result = await BorrowService.borrowSummary();
    sendResponse(res, {
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: result,
    });
  },
};
