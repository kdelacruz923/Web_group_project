"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFindUsersByKeyword = exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayUsersList = void 0;
const users1_1 = __importDefault(require("../Models/users1"));
function DisplayUsersList(req, res, next) {
    users1_1.default.find(function (err, users1Collection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Users List display Successfully ', users: users1Collection, user: req.user });
    });
}
exports.DisplayUsersList = DisplayUsersList;
function DisplayAddPage(req, res, next) {
    res.json({ success: true, msg: 'Add Page  display Successfully ' });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    users1_1.default.findById(id, {}, {}, function (err, usersToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Edit Page Displayed Successfully ', users: usersToEdit });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newUsers = new users1_1.default({
        "Name": req.body.users1Name,
        "Email": req.body.users1Email,
        "Password": req.body.users1Password,
        "Created": req.body.users1Created,
        "Updated": req.body.users1Updated
    });
    users1_1.default.create(newUsers, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Added User', users: newUsers });
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedUsers = new users1_1.default({
        "_id": id,
        "Name": req.body.users1Name,
        "Email": req.body.users1Email,
        "Password": req.body.users1Password,
        "Created": req.body.users1Created,
        "Updated": req.body.users1Updated
    });
    users1_1.default.updateOne({ _id: id }, updatedUsers, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Updated Users', users: updatedUsers });
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    users1_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.json({ success: true, msg: 'Successfully Deleted Users' });
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function ProcessFindUsersByKeyword(req, res, next) {
    try {
        const keyword = encodeURIComponent(req.params.keyword);
        console.log('Keyword:', keyword);
        users1_1.default.find({ Name: ({ $regex: new RegExp(keyword, 'i') }) }, function (err, matchingUsers) {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }
            res.send({ matchingUsers });
        });
    }
    catch (error) {
        console.error('Error in ProcessFindUsersByKeyword:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
exports.ProcessFindUsersByKeyword = ProcessFindUsersByKeyword;
//# sourceMappingURL=users1-list.js.map