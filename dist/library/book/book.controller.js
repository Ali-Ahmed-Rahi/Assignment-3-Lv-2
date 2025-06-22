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
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.BookController = {
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield book_service_1.BookService.createBook(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }),
    getAllBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { filter, sortBy, sort, limit } = req.query;
        const books = yield book_service_1.BookService.getBooks(filter, sortBy, sort, Number(limit));
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }),
    getBookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield book_service_1.BookService.getBookById(req.params.bookId);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const updated = yield book_service_1.BookService.updateBook(req.params.bookId, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book updated successfully',
            data: updated,
        });
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield book_service_1.BookService.deleteBook(req.params.bookId);
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }),
};
