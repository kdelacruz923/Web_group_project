"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const book_list_1 = require("../Controllers/book-list");
router.get('/book-list', book_list_1.DisplayBookList);
router.get('/book/add', book_list_1.DisplayAddPage);
router.get('/book/edit/id', book_list_1.DisplayEditPage);
router.post('/book/add', book_list_1.ProcessAddPage);
router.post('/book/edit/:id', book_list_1.ProcessEditPage);
router.get('/book/delete/:id', book_list_1.ProcessDeletePage);
router.get('/book/find/:keyword', book_list_1.ProcessFindBooksByKeyword);
exports.default = router;
//# sourceMappingURL=book-list.js.map