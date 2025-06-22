import { Request, Response } from 'express';
import { BookService } from './book.service';
import sendResponse from '../../utils/sendResponse';

export const BookController = {
  createBook: async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);
    sendResponse(res, {
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  },

  getAllBooks: async (req: Request, res: Response) => {
    const { filter, sortBy, sort, limit } = req.query;
    const books = await BookService.getBooks(filter, sortBy, sort, Number(limit));
    sendResponse(res, {
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  },

  getBookById: async (req: Request, res: Response) => {
    const book = await BookService.getBookById(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  },

  updateBook: async (req: Request, res: Response) => {
    const updated = await BookService.updateBook(req.params.bookId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Book updated successfully',
      data: updated,
    });
  },

  deleteBook: async (req: Request, res: Response) => {
    await BookService.deleteBook(req.params.bookId);
    sendResponse(res, {
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  },
};
