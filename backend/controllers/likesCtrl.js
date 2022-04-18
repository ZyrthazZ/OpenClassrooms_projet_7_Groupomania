//Imports

const models = require('../models');

//Routes

module.exports = {
    likePost: function (req, res) {
        //Params
        const postId = parseInt(req.params.postId);

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
                            userId: req.userId,
                            postId: postId
                        }
                    })
                    .then(userLikedPost => {
                        console.log("userLikedPost", userLikedPost);
                        if (!userLikedPost) { //If the post is not liked by the user
                            console.log("Begin the liking process")
                            //Add the like from the User to the like table
                            models.Like.create({
                                    userId: req.userId,
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
                                            console.log("num", num);
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
                        } else { //The post is already liked by the user
                            console.log("Need to Unlike");
                            models.Like.destroy({
                                    where: {
                                        userId: req.userId,
                                        postId: postId
                                    }
                                })
                                .then(result => {
                                    console.log("result", result)
                                    if (result !== 1) {
                                        return res.status(401).json({
                                            error: 'Failed to delete Like'
                                        });
                                    } //End of if (result !== 1)
                                    console.log("Like has been deleted");
                                    if (postFound.likes > 0) {
                                        models.Post.update({
                                                likes: postFound.likes - 1
                                            }, {
                                                where: {
                                                    id: postId
                                                }
                                            })
                                            .then(num => {
                                                if (num[0] !== 1) {
                                                    return res.status(401).json({
                                                        error: 'Failed to remove Like'
                                                    });
                                                }
                                                return res.status(200).json({
                                                    message: 'Like removed successfully'
                                                });
                                            })
                                            .catch(error => {
                                                res.status(500).json({
                                                    error: 'Error when removing the Like'
                                                });
                                            })
                                    } else {
                                        models.Post.update({
                                                likes: 0
                                            }, {
                                                where: {
                                                    id: postId
                                                }
                                            })
                                            .then(num => {
                                                if (num[0] !== 1) {
                                                    return res.status(400).json({
                                                        error: 'Failed to reset Like'
                                                    });
                                                }
                                                return res.status(200).json({
                                                    message: 'Like reset successfully'
                                                })
                                            })
                                            .catch(error => {
                                                return res.status(500).json({
                                                    error: 'Error Reseting the like'
                                                });
                                            });
                                    }
                                })
                        } //End of else
                    })
                    .catch(error => {
                        return res.status(500).json({
                            error: 'Error deleting the Like'
                        });
                    });
            });
    }, //End of likePost

}; //End of module.exports