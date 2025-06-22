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
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_1.Book.create(payload);
});
exports.createBook = createBook;
const getAllBooks = (filter, sortBy, sortOrder, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filter)
        query.genre = filter;
    return yield book_1.Book.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .limit(limit);
});
exports.getAllBooks = getAllBooks;
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_1.Book.findById(bookId);
});
exports.getBookById = getBookById;
const updateBook = (bookId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield book_1.Book.findByIdAndUpdate(bookId, update, { new: true });
    if (updated)
        yield book_1.Book.updateAvailability(bookId);
    return updated;
});
exports.updateBook = updateBook;
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_1.Book.findByIdAndDelete(bookId);
});
exports.deleteBook = deleteBook;
