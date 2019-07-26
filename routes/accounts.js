const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");

module.exports = router;

// @route   GET item/test
// @desc    Tests route
// @access  Public
router.get("/test", (req, res) => {
    res.json({
        message: "test success"
    });
});

// @route   GET account/all
// @desc    Get all items
// @access  Public
router.get("/all", (req, res) => {
    Account.find({}, '-password')
        .then(accounts => {
            if (!accounts) {
                res.status(404).send({ noItems: "There are no items" });
            }
            res.json(acounts);
        })
        .catch(err => res.status(404).send({ noItems: "There are no items" }));
});