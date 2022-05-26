//Imports

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const asyncLib = require("async");



//Routes

module.exports = {
    register: async (req, res) => {

        try {
            //We check if user already exists
            const searchedUser = await models.User.findOne({
                attributes: ['email'],
                where: {
                    email: req.body.email
                }
            })

            //User already exist
            if (searchedUser) {
                res.status(500).json({
                    error: "user already exist"
                });
            } else {
                //We crypt the password with bcrypt function
                const encryptedPassword = await bcrypt.hash(req.body.password, 5)
                if (!encryptedPassword) {
                    res.status(404).json({
                        error: 'unable to encrypt password'
                    })
                }
                //We create the newUser
                const newUser = await models.User.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: encryptedPassword,
                    bio: req.body.bio,
                    profilePic: 'http://localhost:8080/images/profils/default_profile_pic.jpg',
                    isAdmin: false
                })
                return res.status(201).json({
                    "userId": newUser.id,
                    "isAdmin": newUser.isAdmin
                })
            }
        } catch (err) {
            console.log('Error in register : ', err)
            res.status(500).json({
                "error": "cannot create user"
            });
        }
    }, //End of register function

    login: async (req, res) => {

        try {
            //Search if user exist
            const searchedUser = await models.User.findOne({
                where: {
                    email: req.body.email
                }
            })

            //If user does not exist
            if (!searchedUser) {
                res.status(404).json({
                    error: 'user not found'
                })
            } else {
                console.log("searchedUser", searchedUser)
                //Compare the password with the encryptedPassword
                const isResBcrypt = await bcrypt.compare(req.body.password, searchedUser.password)

                //Invalid password
                if (!isResBcrypt) {
                    res.status(404).json({
                        error: 'Invalid password !'
                    })
                }

                //The user can log in, we sign the token with the userId and with the isAdmin boolean
                return res.status(201).json({
                    userId: searchedUser.id,
                    token: jwt.sign({
                        userId: searchedUser.id,
                        isAdmin: searchedUser.isAdmin
                    }, process.env.JWT_SIGN_SECRET, {
                        expiresIn: '1h'
                    })
                });
            }
        } catch (err) {
            console.log('Error in login : ', err)
            res.status(500).json({
                "error": "cannot log user"
            });
        }
    }, //End of function login

    getUserProfile: async (req, res) => {
        try {
            //Search the user
            const searchedUser = await models.User.findOne({
                attributes: ['id', 'email', 'username', 'bio', 'profilePic'],
                where: {
                    id: req.params.userId
                }
            })

            //User not found
            if (!searchedUser) {
                res.status(404).json({
                    error: 'user not found'
                })
            } else {
                console.log("searchedUser", searchedUser)
                return res.status(201).json(searchedUser)
            }
        } catch (err) {
            console.log('Error in getUserProfile : ', err)
            res.status(500).json({
                "error": "cannot get user information"
            });
        }
    }, //End of function getUserProfile

    updateUserProfile: async (req, res) => {
        try {
            //Search for the user
            const searchedUser = await models.User.findOne({
                attributes: ['id', 'username', 'bio', 'profilePic'],
                where: {
                    id: req.params.userId
                }
            })
            //User not found
            if (!searchedUser) {
                return res.status(404).json({
                    error: 'user not found'
                })
            }
            console.log("searchedUser", searchedUser)
            //Update the searchedUser
            const updatedUserProfile = await searchedUser.update({
                //If req.body.username is filled, replace the username in the searchedUser object
                username: (req.body.username ? req.body.username : searchedUser.username),
                //If req.body.bio is filled, replace the bio in the searchedUser object
                bio: (req.body.bio ? req.body.bio : searchedUser.bio),
                //If req.body.profilePic is filled, replace it with req.file.filename, if not keep the searchedUser.profilePic
                profilePic: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : searchedUser.profilePic)
            })

            if (!updatedUserProfile) {
                res.status(404).json({
                    error: 'unable to update user profile'
                })
            }
            return res.status(200).json(updatedUserProfile)

        } catch (err) {
            console.log('Error in updateUserProfile : ', err)
            res.status(500).json({
                "error": "cannot update user profile"
            });
        }
    }, //End of function updateUserProfile

    updateUserPassword: async (req, res) => {

        //Search the user
        try {
            const searchedUser = await models.User.findOne({
                attributes: ['id', 'password'],
                where: {
                    id: req.userId
                }
            })
            //User not found
            if (!searchedUser) {
                res.status(404).json({
                    error: 'user not found'
                })
            } else {
                console.log("searchedUser", searchedUser)
                //We check the user with his ancient password
                const isPasswordChecked = await bcrypt.compare(req.body.password, searchedUser.password)
                //If the ancient password is incorrect
                if (!isPasswordChecked) {
                    res.status(404).json({
                        error: 'Invalid password'
                    });
                } else {
                    //New password must be confirmed
                    const similarNewPasswords = await (req.body.newPassword === req.body.confirmNewPassword)
                    //The new passwords don't match
                    if (!similarNewPasswords) {
                        res.status(400).json({
                            error: "New Passwords don't match !"
                        })
                    }
                    //We hash the newPassword with bcrypt function
                    const encryptedNewPassword = await bcrypt.hash(req.body.newPassword, 5)
                    //If the new password is not hashed
                    if (!encryptedNewPassword) {
                        res.status(404).json({
                            error: 'cannot crypt new password !'
                        })
                    }
                    //Update the user with the new password encrypted 
                    const updatedUserPassword = await searchedUser.update({
                        password: encryptedNewPassword
                    })
                    //Can't update the password
                    if (!updatedUserPassword) {
                        res.status(404).json({
                            error: 'unable to update user password'
                        })
                    }
                    return res.status(200).json({
                        message: 'password updated !'
                    })
                }
            }
        } catch (err) {
            console.log('Error in updateUserPassword : ', err)
            res.status(500).json({
                "error": "cannot update user password"
            });
        }
    }, //End of function updateUserPassword

    deleteUserProfile: async (req, res) => {
        try {
            //We search the user
            const searchedUser = await models.User.findOne({
                where: {
                    id: req.params.userId
                }
            })
            //User not found
            if (!searchedUser) {
                return res.status(404).json({
                    error: 'user not found'
                })
            }
            //If isAdmin, don't ask the password of the user
            if (req.isAdmin) {
                //Delete likes from the user in the Like table
                const deleteLikesFromUser = models.Like.destroy({
                    where: {
                        userId: req.params.userId
                    }
                })
                if (!deleteLikesFromUser) {
                    res.status(404).json({
                        error: 'cannot delete Like'
                    })
                }
                console.log("likes deleted from the Like table")
                //Delete comments from the user in the comment table
                const deleteCommentsFromUser = models.Comment.destroy({
                    where: {
                        userId: req.params.userId
                    }
                })
                if (!deleteCommentsFromUser) {
                    res.status(404).json({
                        error: 'cannot delete Comment'
                    })
                }
                console.log("comments deleted from the Comment table")
                //Delete posts from the user in the post table
                const deletePostsFromUser = models.Post.destroy({
                    where: {
                        userId: req.params.userId
                    }
                })
                if (!deletePostsFromUser) {
                    res.status(404).json({
                        error: 'cannot delete Post'
                    })
                }
                console.log("posts deleted from the Post table")
                //Delete user from the user table
                const deleteUser = models.User.destroy({
                    where: {
                        id: req.params.userId
                    }
                })
                if (!deleteUser) {
                    res.status(404).json({
                        error: 'cannot delete User'
                    })
                }
                console.log("user deleted from the user table")
                res.status(200).json({
                    message: 'user has been deleted !'
                })
            }
            console.log("isNotAdmin")
            //Check user with ancient password
            const checkPassword = await bcrypt.compare(req.body.password, searchedUser.password)
            //Wrong password
            if (!checkPassword) {
                return res.status(404).json({
                    error: 'wrong password !'
                })
            }
            //Delete likes from the user in the Like table
            const deleteLikesFromUser = models.Like.destroy({
                where: {
                    userId: req.params.userId
                }
            })
            if (!deleteLikesFromUser) {
                return res.status(404).json({
                    error: 'cannot delete Like'
                })
            }
            console.log("likes deleted from the Like table")
            //Delete comments from the user in the comment table
            const deleteCommentsFromUser = models.Comment.destroy({
                where: {
                    userId: req.params.userId
                }
            })
            if (!deleteCommentsFromUser) {
                return res.status(404).json({
                    error: 'cannot delete Comment'
                })
            }
            console.log("comments deleted from the Comment table")
            //Delete posts from the user in the post table
            const deletePostsFromUser = models.Post.destroy({
                where: {
                    userId: req.params.userId
                }
            })
            if (!deletePostsFromUser) {
                return res.status(404).json({
                    error: 'cannot delete Post'
                })
            }
            console.log("posts deleted from the Post table")
            //Delete user from the user table
            const deleteUser = models.User.destroy({
                where: {
                    id: req.params.userId
                }
            })
            if (!deleteUser) {
                return res.status(404).json({
                    error: 'cannot delete User'
                })
            }
            console.log("user deleted from the user table")
            return res.status(200).json({
                message: 'user has been deleted !'
            })

        } catch (err) {
            console.log('Error in deleteUser : ', err)
            res.status(500).json({
                "error": "cannot delete user"
            });
        }
    }, //End of deleteUserProfile
}; //End of modules.exports