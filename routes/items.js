const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const Validator = require("../utils/validator");
const bcrypt = require("bcrypt");

// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    message: "test success"
  });
});

// @route   GET item/all
// @desc    Get all items
// @access  Public

router.get("/all", (req, res) => {
  const errors = {};
  Item.find({}, '-email')
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   POST item/createItem
// @desc    Create an item
// @access  Public
router.post("/createItem", (req, res) => {

  let val = Validator(req.body);

  if (val.isValid) {

    const newItem = new Item({
      username: req.body.username,
      email: req.body.email,
      content: req.body.content
    });

    bcrypt.hash(req.body.email, 15)
      .then((hash) => {
        newItem.email = hash
        newItem.save()
        res.status(200).send("Added New Item")
      })
      .catch(err => res.status(555).json({ "Fault": `${err}` }))

    // newItem.save()
    //   .then(() => res.status(200).send("Item Added"))
    //   .catch(err => res.status(404).json({ Items: "Item not added" }));

  } else {
    res.status(404).send(val.errors);
  }
});

// @route   PUT item/updateItem
// @desc    Update first item
// @access  Public
router.put("/updateItem", (req, res) => {
  
  let val = Validator(req.body);

  if (val.isValid) {

    Item.findOne({ "username": req.body.username })
    .then((item) => {

      bcrypt.compare(req.body.email, item.email).then(ifMatch => {
        if (ifMatch) {

          Item.updateOne(
            { 'username': req.body.username },
            { $set: { 'content': req.body.content } }
          )
            .then(() => res.status(200).send("Item Updated"))
            .catch(err => res.status(404).json({ noItems: "No Items Exist" }));
        }
        else {
          res.send("Incorrect Email")
        }
      })
        .catch(err => res.status(404).send("Incorrect User Name"));
    }).catch(err => res.status(404).send("Incorrect User Name"));

    // Item.updateOne(
    //   { 'username': req.body.username },
    //   { $set: { 'content': req.body.content } }
    // )
    //   .then(() => res.status(200).send("Item Updated"))
    //   .catch(err => res.status(404).json({ noItems: "No Items Exist" }));
  }
});

// @route   DELETE item/deleteItem
// @desc    Delete first item
// @access  Public
router.delete("/deleteItem", (req, res) => {
  Item.findOne({ "username": req.body.username })
    .then((item) => {

      bcrypt.compare(req.body.email, item.email).then(ifMatch => {
        if (ifMatch) {

          Item.deleteOne({ username: req.body.username })
            .then((ok) => {
              console.log(ok);
              if (ok.n == 0) {
                res.status(404).send("Item not Deleted")
              } else { res.status(200).send("Item Deleted") }
            }).catch(err => res.status(404).json({ noItems: "No Items Exist" }));
        }
        else {
          res.status(404).send("Incorrect Email")
        }
      })
        .catch(err => res.status(404).send("Can't check email"));

      // res.status(200).send("Item Deleted"))
      // .catch(err => res.status(404).json({ noItems: "No Items Exist" }));

    }).catch(err => res.status(404).send("Incorrect User Name"));
});

module.exports = router;