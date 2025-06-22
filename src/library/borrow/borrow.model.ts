import { Schema, model } from 'mongoose';
import { IBorrow } from './borrow.types';
import { Book } from '../book/book.model';

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// 🧠 Post-save middleware: After borrow, check and update book availability
borrowSchema.post('save', async function (doc) {
  await Book.updateAvailability(doc.book.toString());
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
