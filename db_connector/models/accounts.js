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

// mongo connection
let uri = 'mongodb://mongo:27017/accounts';
let opts = { useNewUrlParser: true };

// Account Connection
mongoose.connect(uri,opts).then(
    () => { console.log("By Golly It Actually Works! - Accounts")},
    (err) => { console.log("oh dear ol' chap! looks like we need to try again.") }
);

let account = mongoose.model('account', accountSchema);

module.exports = account;