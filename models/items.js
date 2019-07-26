let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema
let itemSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
});

let item = mongoose.model('item', itemSchema);

module.exports = item;