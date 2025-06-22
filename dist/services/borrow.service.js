"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_1 = require("../models/borrow");
const book_1 = require("../models/book");
const borrowBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.Book.findById(payload.book);
    if (!book || book.copies < payload.quantity) {
        throw new Error('Not enough copies or book not found');
    }
    book.copies -= payload.quantity;
    if (book.copies === 0)
        book.available = false;
    yield book.save();
    return yield borrow_1.Borrow.create(payload);
});
exports.borrowBook = borrowBook;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield borrow_1.Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'bookDetails'
            }
        },
        { $unwind: '$bookDetails' },
        {
            $project: {
                _id: 0,
                book: {
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn'
                },
                totalQuantity: 1
            }
        }
    ]);
});
exports.getBorrowSummary = getBorrowSummary;
