//Imports

const models = require('../models');
const asyncLib = require('async');



//Routes
module.exports = {
    createComment: (req, res) => {
        //Params
        console.log("Coucou")
        const postId = req.params.postId;
        const content = req.body.content;
        console.log("req.params.postId", req.params.postId)
        //Waterfall method
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
                        //We create the comment
                        models.Comment.create({
                                userId: req.userId,
                                postId: postId,
                                content: content
                            })
                            .then((commentCreated) => {
                                console.log("commentCreated", commentCreated)
                                callback(null, commentCreated, postFound)
                            })
                            .catch((err) => {
                                res.status(401).json({
                                    error: 'cannot create comment'
                                });
                            })
                    }
                }, //End of function (postFound, callback)

                function (commentCreated, postFound, callback) {
                    if (commentCreated) {
                        console.log("hello")
                        postFound.update({
                                commentsCount: postFound.commentsCount + 1
                            }, {
                                where: {
                                    id: postId
                                }
                            })
                            .then((postFound) => {
                                callback(commentCreated, postFound)
                            })
                            .catch((err) => {
                                res.status(404).json({
                                    error: 'cannot increment commentsCount'
                                });
                            });
                    }
                } //End of function (commentCreated, postFound, callback)

            ], //Exit of waterfall method (NOT THE END)

            function (commentCreated, postFound) {
                if (commentCreated && postFound) {
                    res.status(206).json({
                        postAndComment: {
                            postFound,
                            commentCreated
                        }
                    })
                } else {
                    res.status(500).json({
                        error: 'unable to comment the post'
                    })
                }
            }, //End of function (commentCreated, postFound)

        ) //End of waterfall method
    }, //End of function (createComment)

    updateComment: async (req, res) => {
        //Params
        const commentId = req.params.commentId

        try {
            const searchedComment = await models.Comment.findByPk(commentId)
            if (!searchedComment) {
                res.status(404).json({
                    error: 'comment not found'
                })
            } else {
                console.log("searchedComment", searchedComment)

                const updatedComment = await searchedComment.update({
                    content: (req.body.content ? req.body.content : searchedComment.bodycontent)
                })
                if (updatedComment) {
                    res.status(200).json(
                        updatedComment
                    )
                }
                console.log("comment has been updated !")
            }

        } catch (err) {
            console.log('Error in updateComment : ', err)
            res.status(500).json({
                "error": "no comment found"
            });
        }
    }, //End of function (updateComment)

    deleteComment: async (req, res) => {
        //Params
        const commentId = req.params.commentId

        try {
            const searchedComment = await models.Comment.findByPk(commentId)
            if (!searchedComment) {
                res.status(404).json({
                    error: 'comment not found'
                })
            } else {
                const destroyedComment = await searchedComment.destroy()

                if (destroyedComment) {
                    res.status(200).json({
                        message: 'comment has been deleted !'
                    })
                }
            }

        } catch (err) {
            console.log('Error in deleteComment : ', err)
            res.status(500).json({
                "error": "no comment found"
            });
        }
    }, //End of function (deleteComment)
};