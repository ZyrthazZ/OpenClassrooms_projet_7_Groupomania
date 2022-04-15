//Imports

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const asyncLib = require("async");



//Routes

module.exports = {
    register: function (req, res) {
        //Méthode waterfall pour plus de lisibilité
        asyncLib.waterfall([
                function (callback) {
                    models.User.findOne({
                            attributes: ['email'],
                            where: {
                                email: req.body.email
                            }
                        })
                        .then(function (userFound) {
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                error: "unable to verify user"
                            });
                        });
                }, //End of function(done)
                function (userFound, callback) {
                    if (!userFound) {
                        bcrypt.hash(req.body.password, 5, function (err, encryptedPassword) {
                            callback(null, userFound, encryptedPassword)
                        })
                    } else {
                        return res.status(409).json({
                            'error': 'user already exist'
                        });
                    }
                }, //End of function(userFound, callback)

                function (userFound, encryptedPassword, callback) {
                    var newUser = models.User.create({
                            email: req.body.email,
                            username: req.body.username,
                            password: encryptedPassword,
                            bio: req.body.bio,
                            isAdmin: 0
                        })
                        .then(function (newUser) {
                            callback(newUser);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                error: "cannot add user"
                            });
                        })
                }, //End of function(userFound, encryptedPassword, done)

            ], //Exit of waterfall method (NOT THE END!!!)
            function (newUser) {
                if (newUser) {
                    return res.status(201).json({
                        "userId": newUser.id
                    })
                } else {
                    return res.status(500).json({
                        error: "cannot add user"
                    });
                }
            } //End of function(newUser)
        ); //End of the waterfall method
    }, //End of register function

    login: function (req, res) {
        asyncLib.waterfall([
                function (callback) {
                    models.User.findOne({
                            where: {
                                email: req.body.email
                            }
                        })
                        .then(function (userFound) {
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                error: "unable to verify user"
                            });
                        });
                }, //End of function(callback)

                function (userFound, callback) {
                    if (userFound) {
                        bcrypt.compare(req.body.password, userFound.password, function (errBcrypt, resBcrypt) {
                            callback(null, userFound, resBcrypt);
                        });
                    } else {
                        return res.status(404).json({
                            error: 'user not exist in DB'
                        });
                    }
                }, //End of function(userFound, callback)

                function (userFound, resBcrypt, callback) {
                    if (resBcrypt) {
                        callback(userFound);
                    } else {
                        return res.status(403).json({
                            error: 'Invalid password'
                        });
                    }
                }, //End of function (userFound, resBcrypt, callback)

            ], //Exit of waterfall method (NOT THE END!!!)
            function (userFound) {
                if (userFound) {
                    return res.status(201).json({
                        userId: userFound.id,
                        token: jwt.sign({
                            userId: userFound.id,
                            isAdmin: userFound.isAdmin
                        }, process.env.JWT_SIGN_SECRET, {
                            expiresIn: '1h'
                        })
                    });
                } else {
                    return res.status(500).json({
                        error: 'Unable to log on user'
                    });
                }
            } //End of function(userFound)
        ); //End of waterfall method
    }, //End of function login

    getUserProfile: function (req, res) {
        models.User.findOne({
                attributes: ['id', 'email', 'username', 'bio'],
                where: {
                    id: req.userId
                }
            })
            .then(function (user) {
                console.log("username", user.username)
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({
                        error: "user not found"
                    });
                }
            })
            .catch(function (err) {
                res.status(500).json({
                    error: 'cannot fetch user'
                });
            });
    }, //End of function getUserProfile

    updateUserProfile: function (req, res) {
        asyncLib.waterfall([
                function (callback) {
                    models.User.findOne({
                            attributes: ['id', 'username', 'bio'],
                            where: {
                                id: req.userId
                            }
                        })
                        .then(function (userFound) {
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                error: 'unable to verify user'
                            });
                        });
                }, //End of function(callback)

                function (userFound, callback) {
                    if (userFound) {
                        userFound.update({
                                //If req.body.username if filled, replace the username in the userfound object
                                username: (req.body.username ? req.body.username : userFound.username),
                                //If req.body.bio if filled, replace the bio in the userfound object
                                bio: (req.body.bio ? req.body.bio : userFound.bio)
                            })
                            .then(function (userFound) {
                                callback(userFound);
                            })
                            .catch(function (err) {
                                res.status(500).json({
                                    error: 'cannot update user'
                                });
                            });
                    } else {
                        res.status(404).json({
                            error: 'user not found'
                        });
                    }
                }, //End of function(userFound, callback)
            ], //Exit of waterfall method (NOT THE END!!!)
            function (userFound) {
                if (userFound) {
                    res.status(201).json({
                        userFound
                    });
                } else {
                    res.status(500).json({
                        error: 'cannot update user profile'
                    });
                }
            }, //End of function(userFound)
        ); //End of waterfall method
    }, //End of function updateUserProfile

    updateUserPassword: function (req, res) {
        asyncLib.waterfall([
                function (callback) {
                    console.log("HELLO", req.userId)
                    models.User.findOne({
                            attributes: ['id', 'password'],
                            where: {
                                id: req.userId
                            }
                        })
                        .then(function (userFound) {
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                error: 'unable to verify user'
                            });
                        });
                }, //End of function(callback)

                function (userFound, callback) {
                    if (userFound) {
                        // Ask the user to fill his ancient password for security before changing it
                        bcrypt.compare(req.body.password, userFound.password, function (errBcrypt, resBcrypt) {
                            callback(null, userFound, resBcrypt);
                        });
                    } else {
                        res.status(404).json({
                            error: "user not found"
                        });
                    }
                }, //End of function(userFound, callback)

                function (userFound, resBcrypt, callback) {
                    if (resBcrypt) {
                        callback(null, userFound);
                    } else {
                        return res.status(403).json({
                            error: 'Invalid password'
                        });
                    }
                }, //End of function (userFound, resBcrypt, callback)

                function (userFound, callback) {
                    console.log("Coucou")

                    if (req.body.newPassword === req.body.confirmNewPassword) {
                        bcrypt.hash(req.body.newPassword, 5, function (err, encryptedPassword) {
                            console.log("encryptedPassword", encryptedPassword);
                            callback(null, userFound, encryptedPassword)
                        })
                    } else {
                        return res.status(400).json({
                            error: "Passwords don't match !"
                        })
                    }
                }, //End of function (userFound, callback)

                function (userFound, encryptedPassword, callback) {
                    if (userFound) {
                        userFound.update({
                                password: encryptedPassword
                            })
                            .then(function (userFound) {
                                callback(userFound);
                            })
                            .catch(function (err) {
                                res.status(500).json({
                                    error: 'cannot update user'
                                });
                            });
                    } else {
                        res.status(404).json({
                            error: 'user not found'
                        });
                    }
                }, //End of function (userFound)

            ], //Exit of waterfall method (NOT THE END)

            function (userFound) {
                if (userFound) {
                    res.status(201).json({
                        message: "user password has been updated"
                    });
                } else {
                    res.status(500).json({
                        error: 'cannot update user profile'
                    });
                }
            }, //End of function(userFound)

        ) //End of waterfall method
    }, //End of function updateUserPassword

    deleteUserProfile: function (req, res) {
        asyncLib.waterfall([
                function (callback) {
                    models.User.findOne({
                            where: {
                                id: req.userId
                            }
                        })
                        .then(function (userFound) {
                            console.log("userFound", userFound)
                            callback(null, userFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                error: 'unable to verify user'
                            });
                        });
                }, //End of function(callback)

                function (userFound, callback) {
                    if (userFound) {
                        // Check the user password before deleting the profile
                        bcrypt.compare(req.body.password, userFound.password, function (errBcrypt, resBcrypt) {
                            callback(null, userFound, resBcrypt);
                        });
                    } else {
                        res.status(404).json({
                            error: "user not found"
                        });
                    }
                }, //End of function(userFound, callback)

                function (userFound, resBcrypt, callback) {
                    if (resBcrypt) {
                        callback(null, userFound);
                    } else {
                        return res.status(403).json({
                            error: 'Invalid password'
                        });
                    }
                }, //End of function (userFound, resBcrypt, callback)

                function (userFound, callback) {
                    if (userFound) {
                        // Delete user from the Like table
                        models.Like.destroy({
                                where: {
                                    userId: req.userId
                                }
                            })
                            .then(function (userFound) {
                                console.log("User deleted from the Like table")
                            })
                            .catch(function (err) {
                                res.status(500).json({
                                    error: 'cannot delete Like'
                                });
                            });

                        // FIX HERE : delete user from Comment table

                        // Delete user from the Post table
                        models.Post.destroy({
                                where: {
                                    userId: req.userId
                                }
                            })
                            .then(function (userFound) {
                                console.log("User deleted from the Post table")
                            })
                            .catch(function (err) {
                                res.status(500).json({
                                    error: 'cannot delete Like'
                                });
                            });
                        // Delete user from the User table
                        models.User.destroy({
                                where: {
                                    id: req.userId
                                }
                            })
                            .then(function (userFound) {
                                console.log("User deleted from the User table")
                                callback(userFound);
                            })
                            .catch(function (err) {
                                res.status(502).json({
                                    error: 'cannot delete Like'
                                });
                            });
                    } else {
                        res.status(400).json({
                            error: 'unable to delete user'
                        });
                    };
                }
            ], //Exit of waterfall method (NOT THE END)

            function (userFound) {
                if (userFound) {
                    res.status(201).json({
                        message: 'user deleted'
                    })
                } else {
                    res.status(404).json({
                        error: 'unable to delete user'
                    })
                }
            }, //End of function (userFound)

        ); //End of waterfall method
    }, //End of deleteUserProfile
}; //End of modules.exports