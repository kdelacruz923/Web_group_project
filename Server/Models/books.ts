// Step 1 - Import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data
const BooksSchema = new Schema
({
    ISBN : Number ,
    Title: String ,
    Author: String ,
    Publisher:String,
    Year: Number

},
{
    collection: "books"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("Books", BooksSchema);

// Step 4 - Export the Model -> this makes the file a module
export default Model;