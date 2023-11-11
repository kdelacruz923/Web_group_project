"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFindBooksByKeyword = exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayBookList = void 0;
const books_1 = __importDefault(require("../Models/books"));
function DisplayBookList(req, res, next) {
    books_1.default.find(function (err, booksCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Book List display Successfully ', books: booksCollection, user: req.user });
    });
}
exports.DisplayBookList = DisplayBookList;
function DisplayAddPage(req, res, next) {
    res.json({ success: true, msg: 'Add Page  display Successfully ' });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    books_1.default.findById(id, {}, {}, function (err, booksToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Edit Page Displayed Successfully ', books: booksToEdit });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newBooks = new books_1.default({
        "ISBN": req.body.booksISBN,
        "Title": req.body.booksTitle,
        "Author": req.body.booksAuthor,
        "Publisher": req.body.booksPublisher,
        "Year": req.body.booksYear
    });
    books_1.default.create(newBooks, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Added Book', books: newBooks });
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedBooks = new books_1.default({
        "_id": id,
        "ISBN": req.body.booksISBN,
        "Title": req.body.booksTitle,
        "Author": req.body.booksAuthor,
        "Publisher": req.body.booksPublisher,
        "Year": req.body.booksYear
    });
    books_1.default.updateOne({ _id: id }, updatedBooks, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Updated Books', books: updatedBooks });
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    books_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Deleted Books' });
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function ProcessFindBooksByKeyword(req, res, next) {
    try {
        const keyword = encodeURIComponent(req.params.keyword);
        console.log('Keyword:', keyword);
        books_1.default.find({ Name: ({ $regex: new RegExp(keyword, 'i') }) }, function (err, matchingBooks) {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }
            res.send({ matchingBooks });
        });
    }
    catch (error) {
        console.error('Error in ProcessFindBooksByKeyword:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
exports.ProcessFindBooksByKeyword = ProcessFindBooksByKeyword;
//# sourceMappingURL=book-list.js.map