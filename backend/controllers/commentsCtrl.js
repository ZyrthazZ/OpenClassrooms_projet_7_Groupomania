//Imports

const models = require('../models');



//Routes
module.exports = {
    createComment: async (req, res) => {
        //Params
        const postId = req.params.postId;
        const content = req.body.content;

        try {
            //Search the post to comment
            const searchedPost = await models.Post.findByPk(postId)
            //If post is not found
            if (!searchedPost) {
                res.status(404).json({
                    error: 'post not found'
                })
            } else {
                console.log("searchedPost", searchedPost)
                //Create the comment
                const createdComment = await models.Comment.create({
                    userId: req.userId,
                    postId: postId,
                    content: content
                })

                //If comment does not create
                if (!createdComment) {
                    res.status(404).json({
                        error: 'comment not created'
                    })
                }
                console.log("createComment", createdComment)
                //Increment comments count on the post
                const incrementCommentsCount = await searchedPost.update({
                    commentsCount: searchedPost.commentsCount + 1
                }, {
                    where: {
                        id: postId
                    }
                })
                //If we can't increment comments count
                if (!incrementCommentsCount) {
                    res.status(404).json({
                        error: 'cannot increment comments count on post'
                    })
                }
                //Return an object with the post and the created comment
                return res.status(201).json({
                    postAndComment: {
                        searchedPost,
                        createdComment
                    }
                })
            }
            //Catch the errors 
        } catch (err) {
            res.status(500).json({
                "error": "no post found"
            });
        }
    }, //End of function (createComment)

    updateComment: async (req, res) => {
        //Params
        const commentId = parseInt(req.params.commentId)
        try {
            console.log("commentId", commentId)
            //Search the comment to update
            const searchedComment = await models.Comment.findByPk(commentId)
            //If comment is not found
            if (!searchedComment) {
                res.status(404).json({
                    error: 'comment not found'
                })
            } else {
                console.log("searchedComment", searchedComment)

                //We update the comment
                const updatedComment = await searchedComment.update({
                    content: (req.body.content ? req.body.content : searchedComment.content)
                })
                if (updatedComment) {
                    res.status(200).json(
                        updatedComment
                    )
                }
                console.log("comment has been updated !")
            }
            //Catch the errors
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