//Imports

var jwt = require('jsonwebtoken');
var models = require('../models');

//This middleware tries to secure the requests on the posts
module.exports = async (req, res, next) => {
    try {
        //We get in the header everything after the "space", so after "bearer", which is the token
        const token = req.headers.authorization.split(' ')[1];
        console.log("token", token);
        //Let's decode the token with the verify function from jwt, with the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        //Let's extract the userId and the isAdmin from the decodedToken
        req.userId = decodedToken.userId;
        req.idAdmin = decodedToken.isAdmin;
        console.log("req.userId FROM AUTH", req.userId);
        console.log("req.isAdmin FROM AUTH", req.isAdmin);

        //Let's check if the post contains a userId equal to the extracted userId
        var checkUserId = await models.User.findOne({
            where: {
                id: req.userId
            }
        });

        console.log("checkUserId", checkUserId);
        //Let's check if there is userId in the checkUserId object and if he is different 
        //from the token extracted userId
        if (checkUserId.id && checkUserId.id !== req.userId) { // User login is not user that owns post
            throw "Invalid user ID";
        } else { // User login is user that owns post
            console.log("Authentified request !")
            next();
        }
    } catch {
        res.status(401).json({
            error: "Invalid request !"
        });
    }
};