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
exports.BookService = void 0;
const book_model_1 = require("./book.model");
exports.BookService = {
    createBook: (data) => __awaiter(void 0, void 0, void 0, function* () { return yield book_model_1.Book.create(data); }),
    getBooks: (filter_1, sortBy_1, sort_1, ...args_1) => __awaiter(void 0, [filter_1, sortBy_1, sort_1, ...args_1], void 0, function* (filter, sortBy, sort, limit = 10) {
        const query = {};
        if (filter)
            query.genre = filter;
        const sortQuery = {};
        if (sortBy && sort)
            sortQuery[sortBy] = sort === 'asc' ? 1 : -1;
        return book_model_1.Book.find(query).sort(sortQuery).limit(limit);
    }),
    getBookById: (id) => __awaiter(void 0, void 0, void 0, function* () { return book_model_1.Book.findById(id); }),
    updateBook: (id, data) => __awaiter(void 0, void 0, void 0, function* () { return book_model_1.Book.findByIdAndUpdate(id, data, { new: true }); }),
    deleteBook: (id) => __awaiter(void 0, void 0, void 0, function* () { return book_model_1.Book.findByIdAndDelete(id); }),
};
