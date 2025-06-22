import { Borrow } from './borrow.model';
import { Book } from '../book/book.model';
import { IBorrow } from './borrow.types';
import mongoose from 'mongoose';

export const BorrowService = {
  borrowBook: async (data: IBorrow) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const book = await Book.findById(data.book).session(session);
      if (!book) throw new Error('Book not found');
      if (book.copies < data.quantity) throw new Error('Not enough copies available');

      book.copies -= data.quantity;
      await book.save({ session });

      const borrowRecord = await Borrow.create([data], { session });

      await session.commitTransaction();
      session.endSession();

      return borrowRecord[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  borrowSummary: async () => {
    return Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $project: {
          book: {
            title: '$book.title',
            isbn: '$book.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);
  },
};
