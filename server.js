const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const accounts = require("./routes/accounts");

const app = express();

let uri = 'mongodb://localhost:27017/accounts';
let opts = { useNewUrlParser: true };

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/account", accounts);
app.use("/items", items);

// Using the default connection
mongoose.connect(uri, opts).then(
    () => { console.log("By Golly It Actually Works!")},
    (err) => { console.log("oh dear ol' chap! looks like we need to try again.") }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));