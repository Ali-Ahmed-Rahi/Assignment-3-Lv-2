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
exports.BorrowController = void 0;
const borrow_service_1 = require("./borrow.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
exports.BorrowController = {
    borrowBook: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield borrow_service_1.BorrowService.borrowBook(req.body);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Book borrowed successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getBorrowSummary: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield borrow_service_1.BorrowService.borrowSummary();
        (0, sendResponse_1.default)(res, {
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: result,
        });
    }),
};
