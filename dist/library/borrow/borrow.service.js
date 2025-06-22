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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowService = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.BorrowService = {
    borrowBook: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const book = yield book_model_1.Book.findById(data.book).session(session);
            if (!book)
                throw new Error('Book not found');
            if (book.copies < data.quantity)
                throw new Error('Not enough copies available');
            book.copies -= data.quantity;
            yield book.save({ session });
            const borrowRecord = yield borrow_model_1.Borrow.create([data], { session });
            yield session.commitTransaction();
            session.endSession();
            return borrowRecord[0];
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }),
    borrowSummary: () => __awaiter(void 0, void 0, void 0, function* () {
        return borrow_model_1.Borrow.aggregate([
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
    }),
};
