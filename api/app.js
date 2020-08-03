// Loading Express into our Javascript
const express = require('express');
const app = express();

const mongoose = require('./db/mongoose')

const body_parser = require('body-parser');

/*==========Loading the Mongoose Models==========*/
const { List, Task } = require('./db/models');
const taskModel = require('./db/models/task.model');

// Load Middleware
app.use(body_parser.json());

/*==========Route Handlers==========*/

/*==========List Routes==========*/
// GET/Lists → Purpose: Get All Lists
app.get('/lists', (req, res) => {
    // This Should Return an Array with all the Lists in the Database
    List.find({}).then((lists) => {
        res.send(lists)
    });
});

// POST/Lists → Purpose: Creates a new List
app.post('/lists', (req, res) => {
    // This Should Create a new List, and Return the new List Document + the id
    // The List Information will be Passed by the JSON Request Body
    let title = req.body.title;

    let new_list = new List({
        title
    });
    new_list.save().then((listDoc) => {
        // The Full List Document is Returned
        res.send(listDoc);
    });
});

// PATCH/lists/:id → Update a Specified List
app.patch('/lists/:id', (req, res) => {
    // This Should Update the Specified List, with the new Values Specified in the JSON Body of the Request
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body // This will Update the List that it finds, with the Contect of the req.body Object (user sends this)
    }).then(() => {
        res.sendStatus(200); // Not Sending Back what the User Typed
    });
});

// DELETE/lists:id → Delete a Specified List
app.delete('/lists/:id', (req, res) => {
    // This Should Delete the Specified List
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc)
    });
});


/*==========Task Routes==========*/

// GET /lists/:listId/tasks → Getting all Tasks in a Specific List
app.get('/lists/:listId/tasks', (req, res) => {
    // This Should Return All Tasks that Belong to a Specific List
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

// POST /lists/:listId/tasks → Creating a new Task in a Specific List
app.post('/lists/:listId/tasks', (req, res) => {
    // This Should Create a New Task in a List Specified by the listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});


/*==========OTHER STUFF, NO COMMENT FOR NOW==========*/

// To Make Sure that the App is Working
app.listen(3000, () => {
    console.log("Connected to MongoDB Successfully :)");
});