// Loading Express into our Javascript
const express = require("express");
const app = express();

/*==========Loading the Mongoose Models==========*/
const {List, Task} = require('./db/models')


/*==========Route Handlers==========*/

/*==========List Routes==========*/
// GET/Lists → Purpose: Get All Lists
app.get('/lists', (req, res) => {
    // This Should Return an Array with all the Lists in the Database
    res.send("Get the World!");
});

// POST/Lists → Purpose: Creates a new List
app.post('/lists', (req, res) => {
    // This Should Create a new List, and Return the new List Document + the id
    // The List Information will be Passed by the JSON Request Body
    res.send("Post the World!");
});

// PATCH/lists/:id → Update a Specified List
app.patch('/lists/:id', (req, res) => {
    // This Should Update the Specified List, with the new Values Specified in the JSON Body of the Request
    res.send("Patch the World!");
});

// DELETE/lists:id → Delete a Specified List
app.delete('/lists/:id', (req, res) => {
    // This Should Delete the Specified List
    res.send("Delete the World!");
});

// To Make Sure that the App is Working
app.listen(3000, () => {
    console.log("Server is Listening on Port:3000");
});