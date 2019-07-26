let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Schema
let accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 500
    }
});

let account = mongoose.model('item', accountSchema);

module.exports = account;