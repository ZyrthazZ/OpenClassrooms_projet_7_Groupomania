//Imports

var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
const {
    post
} = require('../app');

//Constants

//Routes

module.exports = {
    likeOrDislikePost: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        console.log("req.params", req.params);

        //Params
        var postId = parseInt(req.params.postId);

        //We search for the right Post
        models.Post.findByPk(postId)
            .then(function (postFound) {
                if (!postFound) {
                    res.status(404).json({
                        error: 'post not found !'
                    })
                }
                console.log("postFound", postFound);
                //Search if the user liked the post in the Like table
                models.Like.findOne({
                        where: {
                            userId: userId,
                            postId: postId
                        }
                    })
                    .then(userLikedPost => {
                        console.log("userLikedPost", userLikedPost);
                        //If the post is not liked by the user
                        if (!userLikedPost) {
                            console.log("HERE")
                            //Add the like from the User to the like table
                            models.Like.create({
                                    userId: userId,
                                    postId: postId
                                })
                                .then(() => {
                                    console.log("Like added to the table");
                                    models.Post.update({
                                            likes: postFound.likes + 1
                                        }, {
                                            where: {
                                                id: postId
                                            }
                                        })
                                        .then(num => {
                                            console.log(num);
                                            if (num[0] !== 1) {
                                                return res.status(400).json({
                                                    error: 'failed to add like'
                                                });
                                            }
                                            return res.status(200).json({
                                                message: 'like added successfully !'
                                            });
                                        })
                                        .catch(function (err) {
                                            return res.status(500).json({
                                                error: 'ERROR'
                                            })
                                        });
                                })
                                .catch(function (err) {
                                    return res.status(500).json({
                                        error: 'error when creating the like'
                                    })
                                });
                            //The post is already liked by the user
                        } else {
                            console.log("ça a merdé")
                        }
                    })
            });


    } //End of likeOrDislikePost
}; //End of module.exports