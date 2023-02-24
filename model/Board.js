const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    boardName: {
        type: String,
        require
    },
    sections: [
        {
            sectionName: {
                type: String,
                require
            }
        }
    ],
    tasks: [
        {
            sectionID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'sections'
            },
            task: {
                type: String,
                default: "New task"
            },
            description: {
                type: String,
                default: ""
            }
        }
    ]
});

module.exports = mongoose.model('Board', boardSchema);