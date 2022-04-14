//Imports

var passwordValidator = require('password-validator');


//Create a new schema for the password
var passwordSchema = new passwordValidator();

//Create the password properties in the schema
passwordSchema
    //Password must be at least 8 characters long
    .is().min(8)
    //Password must be max 25 characters long
    .is().max(25)
    //Password must contain an uppercase character
    .has().uppercase()
    //Password must contain a lowercase character
    .has().lowercase()
    //Password must contain at least 2 numbers
    .has().digits(2)
    //Password must contain at least one special character
    .has().symbols()
    //Password must not contain any space
    .has().not().spaces()
    //Password doesn't match this blacklist
    .is().not().oneOf(["Passw0rd1*", "Password123*"]);



module.exports = (req, res, next) => {
    if (req.body.password == null) {
        res.status(400).json({
            message: "Please fill the password field"
        })
    }

    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({
            message: "Error ! Your password doesn't match the right format. He must be between 8 and 25 characters long, contains uppercase, lowercase, at least 2 digits and special character !"
        })
    } else {
        if (req.body.newPassword) {
            console.log("req.body.newPassword", req.body.newPassword);
            if (!passwordSchema.validate(req.body.newPassword)) {
                res.status(400).json({
                    message: "Error ! Your new password doesn't match the right format. He must be between 8 and 25 characters long, contains uppercase, lowercase, at least 2 digits and special character !"
                })
            }
        }
        console.log("Password fits the right format")
        next();
    }
};