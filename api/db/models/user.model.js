const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// JWT Secret
const jwtSecret = "2soqdpwnbbdAcOhPgMjlTz7BXLb6DPXh2IzJpe6jFXKfdq9IouX8NBoAyaGD";

// ----- User Schema ----- //
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

// ----- Instance Methods ----- //
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    // return the document except the password and sessions (we should keep these private)
    return _.omit(userObject, ['password', 'sessions']);
}

UserSchema.methods.generateAccessAuthToken = function () {
    const user = this;
    return new Promise((resolve, reject) => {
        // Create the JSON Web Token and return that
        jwt.sign({
            _id: user._id.toHexString()
        }, jwtSecret, {
            expiresIn: "15m"
        }, (err, token => {
            if (!err) {
                resolve(token);
            } else {
                // In case there is an error
                reject();
            }
        }));
    });
};