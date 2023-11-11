import express from 'express';
const router = express.Router();



import { DisplayAddPage, DisplayEditPage, DisplayBookList, ProcessAddPage, ProcessDeletePage, ProcessEditPage, ProcessFindBooksByKeyword } from '../Controllers/book-list';

router.get('/book-list',  DisplayBookList);

router.get('/book/add', DisplayAddPage);

router.get('/book/edit/id', DisplayEditPage);

/*Process Add Page */
router.post('/book/add', ProcessAddPage);

/*Process Edit Page */
router.post('/book/edit/:id',ProcessEditPage);

/*Process Delete Page */
router.get('/book/delete/:id', ProcessDeletePage);

/*Find products that contains 'kw' */
// Route to find all products containing a keyword
router.get('/book/find/:keyword',  ProcessFindBooksByKeyword);

export default router;
