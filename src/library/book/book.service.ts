import { Book } from './book.model';
import { IBook } from './book.types';

export const BookService = {
  createBook: async (data: IBook) => await Book.create(data),

  getBooks: async (filter: any, sortBy: any, sort: any, limit: number = 10) => {
    const query: any = {};
    if (filter) query.genre = filter;

    const sortQuery: any = {};
    if (sortBy && sort) sortQuery[sortBy] = sort === 'asc' ? 1 : -1;

    return Book.find(query).sort(sortQuery).limit(limit);
  },

  getBookById: async (id: string) => Book.findById(id),

  updateBook: async (id: string, data: Partial<IBook>) => Book.findByIdAndUpdate(id, data, { new: true }),

  deleteBook: async (id: string) => Book.findByIdAndDelete(id),
};
