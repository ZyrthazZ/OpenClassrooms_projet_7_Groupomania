//Imports

const jwt = require('jsonwebtoken');
const models = require('../models');

//This middleware tries to secure the requests on the posts
module.exports = async (req, res, next) => {
    try {
        //We get in the header everything after the "space", so after "bearer", which is the token
        const token = req.headers.authorization.split(' ')[1];
        console.log("token", token);
        //Let's decode the token with the verify function from jwt, with the secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);

        //Let's extract the userId and the isAdmin from the decodedToken
        const {
            isAdmin,
            userId
        } = decodedToken

        req.userId = userId

        console.log("userId", userId)
        console.log("isAdmin", isAdmin)
        console.log("req.params.postId", req.params.postId)


        //If user is amdmin
        if (isAdmin) {
            console.log("isAdmin")
            req.isAdmin
            next();
        } else {
            console.log("isNotAdmin")
            //Check if there is a req.params.postId in the request
            if (req.params.postId) {
                console.log("there is a postId")
                const checkUserId = await models.Post.findOne({
                    where: {
                        id: req.params.postId,
                        userId: userId
                    }
                });

                console.log("checkUserId", checkUserId);
                //Let's check if there is userId in the checkUserId object and if he is different 
                //from the token extracted userId
                if (checkUserId.userId && checkUserId.userId !== userId) { // User login is not user that owns post
                    throw "Invalid user ID";
                } else { // User login is user that owns post
                    console.log("Authentified request with the postId !")
                    next();
                }
                //Let's check if the post contains a userId equal to the extracted userId
            }
        } //End of if (isAdmin)
    } catch (err) {
        console.log('Error in auth_user : ', err)
        res.status(401).json({
            error: "Invalid request !"
        });
    }
};