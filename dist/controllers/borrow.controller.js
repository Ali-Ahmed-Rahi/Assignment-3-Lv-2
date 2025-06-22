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
exports.getBorrowedSummary = exports.borrowBook = void 0;
const book_1 = require("../models/book");
const borrow_1 = require("../models/borrow");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_1.Book.findById(book);
        if (!foundBook || foundBook.copies < quantity) {
            return res.status(400).json({ success: false, message: 'Not enough copies available' });
        }
        foundBook.copies -= quantity;
        if (foundBook.copies === 0) {
            foundBook.available = false;
        }
        yield foundBook.save();
        const borrow = yield borrow_1.Borrow.create({ book, quantity, dueDate });
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to borrow book', error });
    }
});
exports.borrowBook = borrowBook;
const getBorrowedSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_1.Borrow.aggregate([
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
                    as: 'bookDetails',
                },
            },
            { $unwind: '$bookDetails' },
            {
                $project: {
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({ success: true, message: 'Borrowed books summary retrieved successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error getting borrowed summary', error });
    }
});
exports.getBorrowedSummary = getBorrowedSummary;
