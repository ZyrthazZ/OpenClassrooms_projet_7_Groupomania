//Imports
var express = require("express");
var router = express.Router();
var usersCtrl = require("../controllers/usersCtrl");
var auth_user = require("../middleware/auth_user");

//Routes 

router.post('/users/register/', usersCtrl.register);
router.post('/users/login/', usersCtrl.login);
router.get('/users/me/', auth_user, usersCtrl.getUserProfile);
router.put('/users/me/', auth_user, usersCtrl.updateUserProfile);

//Exports

module.exports = router;