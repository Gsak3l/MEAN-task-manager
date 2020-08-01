const mongoose = require('mongoose');

// Creating a Schema
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// Creating the Model
const List = mongoose.Model('List', ListSchema);

module.exports = { List }