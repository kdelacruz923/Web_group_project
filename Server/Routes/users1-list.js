"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users1_list_1 = require("../Controllers/users1-list");
router.get('/users', users1_list_1.DisplayUsersList);
router.get('/users', users1_list_1.DisplayAddPage);
router.get('/users/edit/id', users1_list_1.DisplayEditPage);
router.post('/users/add', users1_list_1.ProcessAddPage);
router.post('/users/edit/:id', users1_list_1.ProcessEditPage);
router.delete('/users/delete/:id', users1_list_1.ProcessDeletePage);
router.get('/users/find/:keyword', users1_list_1.ProcessFindUsersByKeyword);
exports.default = router;
//# sourceMappingURL=users1-list.js.map