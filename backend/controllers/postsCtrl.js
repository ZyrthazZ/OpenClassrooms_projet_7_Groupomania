// Imports
var models = require('../models');
var asyncLib = require('async');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

// Routes
module.exports = {
    createPost: function (req, res) {

        if (req.body.title == null || req.body.content == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }

        if (req.body.title.length <= TITLE_LIMIT || req.body.content.length <= CONTENT_LIMIT) {
            return res.status(400).json({
                'error': 'invalid parameters'
            });
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                        where: {
                            id: req.userId
                        }
                    })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            'error': 'unable to verify user'
                        });
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    models.Post.create({
                            title: req.body.title,
                            content: req.body.content,
                            UserId: userFound.id
                        })
                        .then(function (newPost) {
                            done(newPost);
                        });
                } else {
                    res.status(404).json({
                        'error': 'user not found'
                    });
                }
            },
        ], function (newPost) {
            if (newPost) {
                return res.status(201).json(newPost);
            } else {
                return res.status(500).json({
                    'error': 'cannot create post'
                });
            }
        });
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
    }
}