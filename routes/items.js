const express = require("express");
const router = express.Router();
const Item = require("../models/items");
const Account = require("../models/accounts")
const itemValidator = require("../utils/itemValidator");
const accValidator = require("../utils/loginValidator")
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
  Item.find({})
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      } else {
        res.json(items);
      }
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

// @route   POST item/createItem
// @desc    Create an item
// @access  Public
router.post("/createItem", (req, res) => {

  let accVal = accValidator(req.body);
  if (accVal.isValid) {

    Account.findOne({ "username": req.body.username })
      .then((account) => {

        bcrypt.compare(req.body.password, account.password).then(ifMatch => {
          if (ifMatch) {
            let val = itemValidator(req.body);
            if (val.isValid) {

              const newItem = new Item({
                username: req.body.username,
                content: req.body.content
              });
              newItem.save()
              res.status(200).send("Added New Item")
            } else {
              res.status(404).send(val.errors);
            }
          }
          else {
            res.send("Incorrect Password")
          }
        })
          .catch(err => res.status(404).send("Password not found"));
      }).catch(err => res.status(404).send("Account not found"));
  } else {
    res.status(404).send(accVal.errors);
  }
});

// @route   PUT item/updateItem
// @desc    Update first item
// @access  Public
router.put("/updateItem", (req, res) => {

  let accVal = accValidator(req.body);
  if (accVal.isValid) {

    Account.findOne({ "username": req.body.username })
      .then((account) => {

        bcrypt.compare(req.body.password, account.password).then(ifMatch => {
          if (ifMatch) {
            let val = itemValidator(req.body);
            if (val.isValid) {
              Item.updateOne(
                { 'username': req.body.username },
                { $set: { 'content': req.body.content } })
                .then(() => res.status(200).send("Item Updated"))
                .catch(err => res.status(404).json({ noItems: "No Items Exist" }));
            } else {
              res.send("Incorrect Password")
            }
          }
        })
          .catch(err => res.status(404).send("Password not found"));
      }).catch(err => res.status(404).send("Account not found"));
  } else {
    res.status(404).send(accVal.errors);
  }
});

// @route   DELETE item/deleteItem
// @desc    Delete first item
// @access  Public
router.delete("/deleteItem", (req, res) => {

  let accVal = accValidator(req.body);
  if (accVal.isValid) {

    Account.findOne({ "username": req.body.username })
      .then((account) => {

        bcrypt.compare(req.body.password, account.password).then(ifMatch => {
          if (ifMatch) {
            Item.deleteOne({ username: req.body.username })
              .then((ok) => {
                if (ok.n == 0) {
                  res.status(404).send("Item not Deleted")
                } else { res.status(200).send("Item Deleted") }
              }).catch(err => res.status(404).json({ noItems: "No Items Exist" }));
          }
          else {
            res.send("Incorrect Password")
          }
        })
          .catch(err => res.status(404).send("Password not found"));
      }).catch(err => res.status(404).send("Account not found"));
  } else {
    res.status(404).send(accVal.errors);
  }
});

module.exports = router;