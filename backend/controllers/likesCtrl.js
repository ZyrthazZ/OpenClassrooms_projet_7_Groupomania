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
    /* likePost: async (req, res) => {
        //Params
        const postId = req.params.postId;
        try {
            console.log(postId)
            //We search for the right Post
            const searchedPost = await models.Post.findByPk(postId)

            //We don't find the post
            if (!searchedPost) {
                return res.status(404).json({
                    error: 'post not found'
                })
            } else {
                console.log(searchedPost);
                //We search if the user already liked the post
                const userLikedPost = await models.Like.findOne({
                    where: {
                        userId: req.userId,
                        postId: postId
                    }
                })

                console.log("userLikedPost" + userLikedPost)
                //If the user didn't liked the post
                if (!userLikedPost) {
                    console.log("Begin the liking process")

                    //Add the like from the User to the like table
                    const createdLike = await models.Like.create({
                        where: {
                            userId: req.userId,
                            postId: postId
                        }
                    })

                    console.log(createdLike)
                    //We can't create like
                    if (!createdLike) {
                        return res.status(500).json({
                            error: "cannot add like"
                        })
                    } else {
                        console.log("Like added to the table");

                        //We increment the post likes count by 1
                        const incrementPostCount = await models.Post.update({
                            likes: searchedPost.likes + 1
                        }, {
                            where: {
                                id: postId
                            }
                        })

                        //We can't increment post likes count
                        if (!incrementPostCount) {
                            return res.status(500).json({
                                error: "cannot increment likes count on the post"
                            })
                        } else {
                            return res.status(201).json({
                                message: 'Like added successfully !'
                            })
                        }
                    }
                } else { //If the user already liked the post
                    console.log("userLikedPost" + userLikedPost);
                    console.log("Must destroy Like")

                    //We destroy the existing like
                    const destroyedLike = await models.Like.destroy({
                        where: {
                            userId: req.userId,
                            postId: postId
                        }
                    })

                    //We can't destroy the like
                    if (!destroyedLike) {
                        return res.status(401).json({
                            error: 'Failed to destroy the like'
                        })
                    } else {
                        console.log("Like has been deleted");

                        //Security, checks if the values of the searchedPost.likes are coherent
                        if (searchedPost.likes > 0) {
                            //We decrement the searchedPost likes counter by 1
                            const decrementPostCount = await models.Post.update({
                                likes: searchedPost.likes - 1
                            }, {
                                where: {
                                    id: postId
                                }
                            })

                            //We can't decrement post likes count
                            if (!decrementPostCount) {
                                return res.status(500).json({
                                    error: 'Error when removing like from post likes count'
                                })
                            } else {
                                return res.status(200).json({
                                    message: 'Like removed successfully'
                                });
                            }
                        } else {
                            //We reset the likes counter of the post in case of problem
                            const resetPostLikesCount = await models.Post.update({
                                likes: 0
                            }, {
                                where: {
                                    id: postId
                                }
                            })

                            //We cannot reset the like counter
                            if (!resetPostLikesCount) {
                                return res.status(500).json({
                                    error: 'Failed to reset Like'
                                })
                            } else {
                                return res.status(200).json({
                                    message: 'Like reset successfully'
                                })
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.log('Error in likePost : ', err)

            res.status(500).json({
                "error": "cannot like post"
            });
        }

    }, //End of likePost */

}; //End of module.exports