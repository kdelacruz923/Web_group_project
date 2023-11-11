// Step 1 - Import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data
const User1Schema = new Schema
({
    Name: String,
    Email: String,
    Password: Number,
    Created: Date,
    Updated: Date
},
{
    collection: "users1"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("Users", User1Schema);

// Step 4 - Export the Model -> this makes the file a module
export default Model;