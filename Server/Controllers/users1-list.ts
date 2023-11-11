import express from 'express';

import Users1 from '../Models/users1';

import { UserDisplayName } from '../Util';
import { CallbackError } from 'mongoose';

export function DisplayUsersList(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    Users1.find(function(err, users1Collection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        //res.render('index', {title: 'Users List', page: 'users-list', users: usersCollection, displayName: UserDisplayName(req) });
        res.json({success:true,msg: 'Users List display Successfully ',users:users1Collection, user:req.user});
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  res.json({success:true,msg: 'Add Page  display Successfully '});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    // pass the id to the db and read the users into the edit page
    Users1.findById(id, {}, {}, function(err, usersToEdit)
    {
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      // show the edit view with the data
      res.json({success:true,msg: 'Edit Page Displayed Successfully ',users: usersToEdit});
    });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  // instantiate a new Users to Add
  let newUsers = new Users1
  ({
    "Name": req.body.users1Name,
    "Email": req.body.users1Email,
    "Password": req.body.users1Password,
    "Created": req.body.users1Created,
    "Updated": req.body.users1Updated
  });

  // Insert the new User object into the database (movies collection)
  Users1.create(newUsers, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the users-list
    res.json({success: true, msg: 'Successfully Added User', users: newUsers});
  })


}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    // instantiate a new Users to Edit
  let updatedUsers = new Users1
  ({
    "_id" : id,
    "Name": req.body.users1Name,
    "Email": req.body.users1Email,
    "Password": req.body.users1Password,
    "Created": req.body.users1Created,
    "Updated": req.body.users1Updated
  });

   //update users in the database
   Users1.updateOne({_id:id}, updatedUsers, function(err: CallbackError)
   {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful --> go to users-list page
    res.json({success: true, msg: 'Successfully Updated Users', users: updatedUsers});

   })

}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
    let id = req.params.id;

    //pass the id to the database and delete the users
    Users1.remove({_id:id}, function(err: CallbackError){
        if(err)
        {
          console.error(err);
          res.end(err);
        }

        //delete was successful
        res.json({success: true, msg: 'Successfully Deleted Users'});
    
    })
   

}

export   function ProcessFindUsersByKeyword(req: express.Request, res: express.Response, next: express.NextFunction) :void
{
  try {
    // Extracting the keyword from the request
    const keyword = encodeURIComponent(req.params.keyword);

    console.log('Keyword:', keyword);

        // Find users that contain the keyword in their name (case-insensitive)
        Users1.find({ Name: ({ $regex: new RegExp(keyword, 'i') }) }, function (err: any, matchingUsers: any[]) {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }

            // Sending the matching users as the response
            res.send({ matchingUsers });

         });
    } catch (error) {
        // Handle errors appropriately
        console.error('Error in ProcessFindUsersByKeyword:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }

  

}