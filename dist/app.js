"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./library/book/book.route");
const borrow_route_1 = require("./library/borrow/borrow.route");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Library 📕');
});
app.use('/api/books', book_route_1.BookRoutes);
app.use('/api/borrow', borrow_route_1.BorrowRoutes);
app.use(errorHandler_1.default);
exports.default = app;
