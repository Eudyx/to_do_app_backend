const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userBoards: Array
});

module.exports = mongoose.model('User', userSchema);