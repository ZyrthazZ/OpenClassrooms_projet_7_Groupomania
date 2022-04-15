// Imports
var models = require('../models');
var asyncLib = require('async');
const {
    post
} = require('../routes/postsRouter');

// Constants
const ITEMS_LIMIT = 50;

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

    listPosts: function (req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;
        console.log("req.userId FROM CONTROLLER", req.userId)
        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.Post.findAll({
                order: [(order != null) ? order.split(':') : ['title', 'ASC']],
                attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                include: [{
                    model: models.User,
                    attributes: ['username']
                }]
            })
            .then(function (posts) {
                if (posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(404).json({
                        "error": "no posts found"
                    });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).json({
                    "error": "invalid fields"
                });
            });
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