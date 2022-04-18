// Imports
var models = require('../models');
var asyncLib = require('async');
const {
    post
} = require('../routes/postsRouter');

// Constants

// Routes
module.exports = {
    createPost: function (req, res) {
        asyncLib.waterfall([
                function (callback) {
                    models.User.findOne({
                            where: {
                                id: req.userId
                            }
                        })
                        .then(function (userFound) {
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                'error': 'unable to verify user'
                            });
                        });
                }, //End of function (callback)

                function (userFound, callback) {
                    if (userFound) {
                        models.Post.create({
                                title: req.body.title,
                                content: req.body.content,
                                UserId: userFound.id
                            })
                            .then(function (newPost) {
                                callback(newPost);
                            });
                    } else {
                        res.status(404).json({
                            error: 'user not found'
                        });
                    }
                }, //End of function (userFound, callback)

            ], //Exit of method waterfall (NOT THE END)

            function (newPost) {
                if (newPost) {
                    return res.status(201).json(newPost);
                } else {
                    return res.status(500).json({
                        'error': 'cannot create post'
                    });
                }
            }, //End of function (newPost)

        ); //End of waterfall method
    }, //End of function createPost


    listOnePost: async (req, res) => {
        //Params
        postId = req.params.postId
        try {
            const searchedPost = await models.Post.findByPk(postId)
            if (!searchedPost) {
                res.status(404).json({
                    error: "post not found"
                })

            }
            const searchedComments = await models.Comment.findAll({
                where: {
                    postId: postId
                }
            })
            if (!searchedComments) {
                res.status(404).json({
                    error: 'comments not found !'
                })
            }

            if (searchedPost && searchedComments) {
                res.status(201).json({
                    postAndComments: {
                        searchedPost,
                        searchedComments
                    }
                })
            }

        } catch (err) {
            console.log('Error in listOnePost : ', err)
            res.status(500).json({
                "error": "no post found"
            });
        }
    }, //End of function (listOnePost)

    listAllPosts: async function (req, res) {
        const ITEMS_LIMIT = 50;
        const {
            limit: unsafeLimit,
            offset: unsafeOffset,
            order,
            fields
        } = req.query;
        const limit = parseInt(unsafeLimit) > ITEMS_LIMIT ? ITEMS_LIMIT : parseInt(unsafeLimit);
        const offset = parseInt(unsafeOffset);

        try {
            const payload = {
                order: [(order != null) ? order.split(':') : ['title', 'ASC']],
                attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: models.User,
                    attributes: ['username']
                }]
            }

            const allPosts = await models.Post.findAll(payload)
            if (allPosts) {
                res.status(200).json(allPosts);
            } else {
                res.status(404).json({
                    "error": "no posts found"
                });
            }
        } catch (err) {
            console.log('Erreur in listAllPosts : ', err)
            res.status(500).json({
                "error": "no posts found"
            });
        }
    }, //End of listPosts

    updatePost: (req, res) => {
        //Params
        const postId = req.params.postId;
        //Search for the post with postId in the req.params
        asyncLib.waterfall([
                function (callback) {
                    models.Post.findByPk(postId)
                        .then((postFound) => {
                            console.log("postFound", postFound)
                            callback(null, postFound)
                        })
                        .catch((err) => {
                            res.status(401).json({
                                error: 'unable to find post'
                            })
                        })
                }, //End of function (callback)

                function (postFound, callback) {
                    if (postFound) {
                        postFound.update({
                                //If req.body.title if filled, replace the title in the userfound object
                                title: (req.body.title ? req.body.title : postFound.title),
                                //If req.body.content if filled, replace the content in the userfound object
                                content: (req.body.content ? req.body.content : postFound.content),
                                //If req.body.attachment if filled, replace the attachment in the userfound object
                                attachment: (req.body.attachment ? req.body.attachment : postFound.attachment)
                            })
                            .then((postFound) => {
                                callback(postFound)
                            })
                    } else {
                        res.status(402).json({
                            error: 'post not found'
                        })
                    }
                }, //End of function (postFound, callback)

            ], //Exit of waterfall method (NOT THE END)

            function (postFound) {
                if (postFound) {
                    res.status(201).json(
                        postFound
                    )
                } else {
                    res.status(404).json({
                        error: 'unable to get the postFound'
                    })
                }
            }, //End of function(postFound)
        ) //End of waterfall method
    }, //End of function updatePost

    deletePost: (req, res) => {
        //Params
        const postId = req.params.postId
        asyncLib.waterfall([
                function (callback) {
                    models.Post.findByPk(postId)
                        .then((postFound) => {
                            console.log("postFound", postFound)
                            callback(null, postFound)
                        })
                        .catch((err) => {
                            res.status(401).json({
                                error: 'post not found'
                            });
                        })
                }, //End of function (callback)

                function (postFound, callback) {
                    if (postFound) {
                        //Delete the likes related to the post
                        models.Like.destroy({
                                where: {
                                    postId: postId
                                }
                            })
                            .then(() => {
                                console.log("likes related to post deleted from the Like table !")
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: 'cannot delete Like'
                                });
                            })

                        //FIX HERE : delete comments from Comment table

                        //Delete the post
                        models.Post.destroy({
                                where: {
                                    userId: req.userId,
                                    id: postId
                                }
                            })
                            .then((postFound) => {
                                console.log("post deleted from the Post table ! ")
                                callback(postFound)
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: 'cannot delete post'
                                });
                            })
                    }
                }, //End of function (postFound, callback)

            ], //Exit of waterfall method (NOT THE END)
            function (postFound) {
                if (postFound) {
                    res.status(205).json({
                        message: 'post deleted'
                    })
                }
            }, //End of function (postFound)

        ) //End of waterfall method
    } //End of function (deletePost)
}