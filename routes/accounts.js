const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const Validator = require("../utils/accountValidator");
const loginValidator = require("../utils/loginValidator")
const bcrypt = require("bcrypt");

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
// @desc    Get all accounts
// @access  Public
router.get("/all", (req, res) => {

    Account.find({}, '-password')
        .then(accounts => {
            if (!accounts) {
                res.status(404).send({ noAccounts: "There are no accounts" });
            }
            res.json(accounts);
        })
        .catch(err => res.status(404).send({ noAccounts: "cant find" }));
});

// @route   GET account/login
// @desc    logs in user
// @access  Public
router.get("/login", (req, res) => {

    let val = loginValidator(req.body);

    if (val.isValid) {

        Account.findOne({ "username": req.body.username })
            .then((account) => {

                bcrypt.compare(req.body.password, account.password).then(ifMatch => {
                    if (ifMatch) {
                        res.status(200).send({ message: "login Success" })
                    }
                    else {
                        res.send("Incorrect Password")
                    }
                })
                    .catch(err => res.status(404).send("Password not found"));
            }).catch(err => res.status(404).send("Account not found"));
    } else {
        res.status(404).send("invalid username and password")
    }
});


// @route   POST account/createAccount
// @desc    Create an account
// @access  Public
router.post("/createAccount", (req, res) => {

    let val = Validator(req.body);

    if (val.isValid) {

        const newAccount = new Account({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        Account.findOne({ "username": req.body.username })
            .then((accounts) => {
                if (accounts != null) {
                    res.send("Username is already in use")
                }
                else {
                    Account.findOne({ "email": req.body.email })
                        .then((accounts) => {
                            if (accounts != null) {
                                res.send("email is already in use")
                            } else {
                                bcrypt.hash(req.body.password, 15)
                                    .then((hash) => {
                                        newAccount.password = hash
                                        newAccount.save()
                                        res.status(200).send({ message: "Account Succesfully Created" })
                                    })
                                    .catch(err => res.status(555).json({ "Fault": `${err}` }))
                            }
                        })
                        .catch(() => {
                            res.status(404).send("email not valid")
                        })
                }
            })
            .catch(() => {
                res.status(404).send("user name not valid")
            })
    } else {
        res.status(404).send(val.errors);
    }
});