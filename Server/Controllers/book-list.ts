import express from 'express';
import { CallbackError } from 'mongoose';

//import the book model
import Books from '../Models/books';

import { UserDisplayName } from '../Util';


export function DisplayBookList(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    Books.find(function(err, booksCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
     
        res.json({success:true,msg: 'Book List display Successfully ',books:booksCollection, user:req.user});
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  res.json({success:true,msg: 'Add Page  display Successfully '});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    // pass the id to the db and read the book into the edit page
    Books.findById(id, {}, {}, function(err, booksToEdit)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      // show the edit view with the data
      res.json({success:true,msg: 'Edit Page Displayed Successfully ',books: booksToEdit});
    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  // instantiate a new book to Add
  let newBooks = new Books
  ({
    "ISBN": req.body.booksISBN,
    "Title": req.body.booksTitle,
    "Author": req.body.booksAuthor,
    "Publisher": req.body.booksPublisher,
    "Year": req.body.booksYear

     });

  // Insert the new book object into the database (movies collection)
  Books.create(newBooks, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the book-list
    res.json({success: true, msg: 'Successfully Added Book', books: newBooks});
  })


}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    // instantiate a new book to Edit
  let updatedBooks = new Books
  ({
    "_id" : id,
    "ISBN": req.body.booksISBN,
    "Title": req.body.booksTitle,
    "Author": req.body.booksAuthor,
    "Publisher": req.body.booksPublisher,
    "Year": req.body.booksYear
  });

   //update book in the database
   Books.updateOne({_id:id}, updatedBooks, function(err: CallbackError)
   {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful --> go to book-list page
    res.json({success: true, msg: 'Successfully Updated Books', books: updatedBooks});

   })

}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    //pass the id to the database and delete the book
    Books.remove({_id:id}, function(err: CallbackError){
        if(err)
        {
          console.error(err);
          res.end(err);
        }

        //delete was successful
        res.json({success: true, msg: 'Successfully Deleted Books'});
    
    })
   

}

export   function ProcessFindBooksByKeyword(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  try {
    // Extracting the keyword from the request
    const keyword = encodeURIComponent(req.params.keyword);

    console.log('Keyword:', keyword);

        // Find books that contain the keyword in their name (case-insensitive)
        Books.find({ Name: ({ $regex: new RegExp(keyword, 'i') }) }, function (err: any, matchingBooks: any[]) {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }

            // Sending the matching books as the response
            res.send({ matchingBooks });

         });
    } catch (error) {
        // Handle errors appropriately
        console.error('Error in ProcessFindBooksByKeyword:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }

  

}