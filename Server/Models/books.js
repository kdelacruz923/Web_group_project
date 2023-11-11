"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BooksSchema = new Schema({
    ISBN: Number,
    Title: String,
    Author: String,
    Publisher: String,
    Year: Number
}, {
    collection: "books"
});
const Model = mongoose_1.default.model("Books", BooksSchema);
exports.default = Model;
//# sourceMappingURL=books.js.map