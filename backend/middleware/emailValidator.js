//Imports
var emailValidator = require('email-validator');

//This middleware checks if the req.body.email
//is correct regardless an email norm 
module.exports = (req, res, next) => {
    //Check if req.body.email is empty
    if (req.body.email == null) {
        res.status(400).json({
            message: "Please fill the email field"
        })
    }
    if (!emailValidator.validate(req.body.email)) {
        res.status(400).json({
            message: "Please use the right format for your email adress"
        })
    } else {
        console.log("Email adress fits the right format");
        next();
    }
};