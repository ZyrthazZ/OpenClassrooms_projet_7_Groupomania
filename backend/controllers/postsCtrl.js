// Imports
const models = require('../models');
const {
    post
} = require('../routes/postsRouter');

// Constants

// Routes
module.exports = {
    createPost: async (req, res) => {

        try {
            //Search the user
            const searchedUser = await models.User.findByPk(req.userId)
            //User not found
            if (!searchedUser) {
                return res.status(404).json({
                    error: 'user not found'
                })
            }
            console.log("searchedUser", searchedUser)
            //Create the post
            const createdPost = await models.Post.create({
                title: req.body.title,
                content: req.body.content,
                imageUrl: (req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : ''),
                UserId: req.userId,
                username: searchedUser.username,
                bio: searchedUser.bio,
                profilePic: searchedUser.profilePic
            })
            //Cannot create post
            if (!createdPost) {
                return res.status(404).json({
                    error: 'cannot create post'
                })
            }
            return res.status(201).json(createdPost)
        } catch (err) {
            console.log('Error in createPost : ', err)
            res.status(500).json({
                "error": "cannot create post"
            });
        }
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

            const searchedUser = await models.User.findByPk(searchedPost.userId)
            if (!searchedUser) {
                res.status(404).json({
                    error: "user not found"
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

            if (searchedPost && searchedComments && searchedUser) {
                res.status(200).json({
                    postAndCommentsAndUser: {
                        searchedPost,
                        searchedComments,
                        searchedUser
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
                order: [(order != null) ? order.split(':') : ['id', 'DESC']],
                attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                limit: (!isNaN(limit)) ? limit : null,
                offset: (!isNaN(offset)) ? offset : null,
                /* include: [{
                    model: models.User,
                    //add profilePic attribute ? 
                }] */
            }
            //Search for the users
            const searchedUsers = await models.User.findAll({
                attributes: ['id', 'username', 'bio', 'profilePic'],
            })
            //Search for the posts 
            const allPosts = await models.Post.findAll(payload)
            if (allPosts) {
                res.status(200).json({
                    allPosts
                });
            } else {
                res.status(404).json({
                    "error": "no posts found"
                });
            }
        } catch (err) {
            console.log('Erreur in listAllPosts : ', err)
            res.status(500).json({
                "error": "couldn't search for posts"
            });
        }
    }, //End of listPosts

    updatePost: async (req, res) => {
        //Params
        const postId = req.params.postId;

        try {
            //Search for the post
            const searchedPost = await models.Post.findByPk(postId)
            //Post not found
            if (!searchedPost) {
                return res.status(404).json({
                    error: 'post not found'
                })
            }
            //Update the post
            const postUpdated = await searchedPost.update({
                //If req.body.title is filled, replace the title in the searchedPost object
                title: (req.body.title ? req.body.title : searchedPost.title),
                //If req.body.content is filled, replace the content in the searchedPost object
                content: (req.body.content ? req.body.content : searchedPost.content),
                //If there is a file, replace it with req.file.filename, if not keep the searchedPost.imageUrl
                imageUrl: (req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : searchedPost.imageUrl)
            })
            //Cannot update post
            if (!postUpdated) {
                return res.status(404).json({
                    error: 'cannot update post'
                })
            }
            return res.status(201).json(postUpdated)
        } catch (err) {
            console.log('Erreur in updatePost : ', err)
            res.status(500).json({
                "error": "cannot update post"
            });
        }
    }, //End of function updatePost

    deletePost: async (req, res) => {
        //Params
        const postId = req.params.postId

        try {
            //Search the post
            const searchedPost = await models.Post.findByPk(postId)
            //Cannot find post
            if (!searchedPost) {
                return res.status(404).json({
                    error: 'cannot find post'
                })
            }
            console.log("searchedPost", searchedPost)

            //Delete the likes related to the post
            const deleteLikesFromPost = models.Like.destroy({
                where: {
                    postId: postId
                }
            })
            //Cannot delete Like
            if (!deleteLikesFromPost) {
                return res.status(404).json({
                    error: 'cannot delete Like'
                })
            }

            //Delete the comments related to the post
            const deleteCommentsFromPost = models.Comment.destroy({
                where: {
                    postId: postId
                }
            })
            //Cannot delete Comment
            if (!deleteCommentsFromPost) {
                return res.status(404).json({
                    error: 'cannot delete Comment'
                })
            }

            //Delete the post
            const postDeleted = models.Post.destroy({
                where: {
                    id: postId
                }
            })
            //Cannot delete post
            if (!postDeleted) {
                return res.status({
                    error: 'cannot delete post'
                })
            }
            return res.status(200).json({
                message: 'post deleted !'
            })
        } catch (err) {
            console.log('Erreur in deletePost : ', err)
            res.status(500).json({
                "error": "cannot delete post"
            });
        }
    } //End of function (deletePost)
}