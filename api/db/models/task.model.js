const mongoose = require('mongoose');

// Creating a Schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

// Creating the Model
const Task = mongoose.Model('List', TaskSchema);

module.exports = { Task }