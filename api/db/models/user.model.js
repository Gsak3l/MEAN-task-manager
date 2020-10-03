const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
        }))
    })
};

UserSchema.methods.generateRefreshAuthToken = function () {
    // This method simply generates a 64byte hex string
    // Tt doesn't save it to the database, saveSessionToDatabase() does that
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (!err) {
                // no error
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    });
};


UserSchema.methods.createSession = function () {
    let user = this;

    return user.generateRefreshAuthToken().then((refreshToken) => {
        saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('Failed to save session to database.\n');
    });
};




// ----- Helper Methods ----- //

let saveSessionToDatabase = (user, refreshToken) => {
    // Save the session to the Database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        // this takes the user document and push this object to the sessions array
        // this took me about 45 minutes to figure it out 😊
        user.sessions.push({
            'token': refreshToken,
            expiresAt
        });
        user.save().then(() => {
            // saved session successfully
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e)
        });
    })
};

const generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondUntilExpire);
};