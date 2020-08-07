// This File should Handle Connection Logic to the MongoDB Database

// Loading Mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { // Default Port that MongoDB runs on
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => {
    console.log("Connected to the Database");
}).catch((e) => {
    console.log("Error while attempting to connect to the database");
    console.log(e);
});

// Preventing Deprectation Warnings (from MongoDB Native Driver) 
module.exports = {
    mongoose
};