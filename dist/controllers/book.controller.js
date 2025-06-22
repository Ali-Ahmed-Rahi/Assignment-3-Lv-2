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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_1 = require("../models/book");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, isbn, description, copies, available } = req.body;
        const allowedGenres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
        if (!allowedGenres.includes(genre)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid genre',
                error: `Genre must be one of: ${allowedGenres.join(', ')}`,
            });
        }
        const book = yield book_1.Book.create({ title, author, genre, isbn, description, copies, available });
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create book', error });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const books = yield book_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(Number(limit));
        res.status(200).json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving books', error });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findById(req.params.bookId);
        res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get book', error });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update book', error });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_1.Book.findByIdAndDelete(req.params.bookId);
        res.status(200).json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete book', error });
    }
});
exports.deleteBook = deleteBook;
