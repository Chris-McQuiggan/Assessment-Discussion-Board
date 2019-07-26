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

// mongo connection
let uri = 'mongodb://mongo:27017/items';
let opts = { useNewUrlParser: true };

// Item Connection
mongoose.connect(uri,opts).then(
    () => { console.log("By Golly It Actually Works! - Items")},
    (err) => { console.log("oh dear ol' chap! looks like we need to try again.") }
);

let item = mongoose.model('item', itemSchema);

module.exports = item;