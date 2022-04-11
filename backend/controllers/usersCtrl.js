//Imports

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const asyncLib = require("async");

//Constants

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^([a-zA-Z0-9@*#]{8,15})$/



//Routes

module.exports = {
    register: function (req, res) {

        if (req.body.email == null || req.body.username == null || req.body.password == null) {
            return res.status(400).json({
                error: "missing parameters"
            });
        }
        if (req.body.username.length >= 13 || req.body.username.length <= 4) {
            return res.status(400).json({
                error: "username must be from 5 to 13 length"
            });
        }

        if (!EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({
                error: "use a correct email format"
            });
        }

        if (!PASSWORD_REGEX.test(req.body.password)) {
            return res.status(400).json({
                error: "password must be at least 8 characters long and max 15 characters long"
            });
        }
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

        if (req.body.email == null || req.body.password == null) {
            return res.status(400).json({
                error: "missing parameters"
            });
        }

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
                            attributes: ['id', 'bio'],
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
}; //End of modules.exports