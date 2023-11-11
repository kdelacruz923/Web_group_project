"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const User1Schema = new Schema({
    Name: String,
    Email: String,
    Password: Number,
    Created: Date,
    Updated: Date
}, {
    collection: "users1"
});
const Model = mongoose_1.default.model("Users", User1Schema);
exports.default = Model;
//# sourceMappingURL=users1.js.map