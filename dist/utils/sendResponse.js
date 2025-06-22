"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendResponse;
function sendResponse(res, data) {
    res.status(200).json(data);
}
