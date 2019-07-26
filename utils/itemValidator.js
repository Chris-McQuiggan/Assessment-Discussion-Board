const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateInput(data) {
    let errors = {};

    // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
    data.username = !isEmpty(data.username) ? data.username : "";
    data.content = !isEmpty(data.content) ? data.content : "";

    //Login validation rules
    if (!Validator.isLength(data.username, {min:2, max: 30})){
        errors.username = "User name is not the right length";
    }

    if (!Validator.isAlphanumeric(data.username, 'en-GB')){
        errors.username = "User name can only use numbers and letters";
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "User name field is required";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "Content field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};