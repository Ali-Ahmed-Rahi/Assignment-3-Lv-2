"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, _req, res, _next) => {
    const statusCode = 400;
    res.status(statusCode).json({
        success: false,
        message: 'Validation failed',
        error: err,
    });
};
exports.default = globalErrorHandler;
