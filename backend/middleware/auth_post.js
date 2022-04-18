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
        req.isAdmin = decodedToken.isAdmin;
        console.log("req.userId FROM AUTH", req.userId);
        console.log("req.isAdmin FROM AUTH", req.isAdmin);
        console.log("req.params.postId", req.params.postId)
        //Let's check if the post contains a userId equal to the extracted userId
        const checkUserId = await models.Post.findOne({
            where: {
                id: req.params.postId,
                userId: req.userId
            }
        });

        console.log("checkUserId.id", checkUserId.id);
        //Let's check if there is userId in the checkUserId object and if he is different 
        //from the token extracted userId
        if (checkUserId.userId && checkUserId.userId !== req.userId) { // User login is not user that owns post
            throw "Invalid user ID";
        }
        if (checkUserId.id && checkUserId.id != req.params.postId) {
            throw "Invalid id";
        }
        console.log("Authentified request !")
        next();

    } catch (e) {
        console.log(e)
        res.status(401).json({
            error: "Invalid request !"
        });
    }
};