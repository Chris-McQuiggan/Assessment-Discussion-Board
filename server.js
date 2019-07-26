const express = require("express");
const bodyParser = require("body-parser");

const accounts = require("./routes/accounts");
const items = require("./routes/items");

const app = express();

// let uri = 'mongodb://localhost:27017/accounts';
// let opts = { useNewUrlParser: true };

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/account", accounts);
app.use("/items", items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));