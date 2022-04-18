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
        const {
            isAdmin,
            userId
        } = decodedToken

        req.userId = userId

        console.log("userId", userId)
        console.log("isAdmin", isAdmin)
        console.log("req.params.courgetteId", req.params.courgetteId)
        console.log("req.params.tomateId", req.params.tomateId)

        if (isAdmin) {
            console.log("isAdmin")
            req.isAdmin
            next();
        } else {
            console.log("isNotAdmin")
            //Check if there is a req.params.tomateId in the request
            if (req.params.tomateId) {
                console.log("there is a tomateId")
                const checkUserId = await models.User.findOne({
                    where: {
                        id: userId
                    }
                });

                console.log("checkUserId", checkUserId);
                //Let's check if there is userId in the checkUserId object and if he is different 
                //from the token extracted userId
                if (checkUserId.id && checkUserId.id !== userId) { // User login is not user that owns post
                    throw "Invalid user ID";
                } else { // User login is user that owns post
                    console.log("Authentified request with the tomateId !")
                    next();
                }
                //Let's check if the post contains a userId equal to the extracted userId
            } else {
                //Check if there is a req.params.courgetteId in the request
                if (req.params.courgetteId) {
                    console.log("there is a courgetteId")
                    if (req.params.courgetteId == userId) {
                        console.log("les id correspondent !")
                        const checkUserId = await models.User.findOne({
                            where: {
                                id: userId
                            }
                        });

                        console.log("checkUserId", checkUserId);
                        //Let's check if there is userId in the checkUserId object and if he is different 
                        //from the token extracted userId
                        if (checkUserId.id && checkUserId.id !== userId) { // User login is not user that owns post
                            throw "Invalid user ID";
                        } else { // User login is user that owns post
                            console.log("Authentified request with the courgetteId!")
                            next();
                        }
                        //Let's check if the post contains a userId equal to the extracted userId
                    } else {
                        throw "Invalid user ID";
                    }
                } else { //If there is no req.params.courgetteId
                    console.log("no courgetteId or tomateId")

                    const checkUserId = await models.User.findOne({
                        where: {
                            id: userId
                        }
                    });

                    console.log("checkUserId", checkUserId);
                    //Let's check if there is userId in the checkUserId object and if he is different 
                    //from the token extracted userId
                    if (checkUserId.id && checkUserId.id !== userId) { // User login is not user that owns post
                        throw "Invalid user ID";
                    } else { // User login is user that owns post
                        console.log("Authentified request !")
                        next();
                    }
                }
            }

        } //End of if (isAdmin)
    } catch (err) {
        console.log('Error in auth_user : ', err)
        res.status(401).json({
            error: "Invalid request !"
        });
    }
};