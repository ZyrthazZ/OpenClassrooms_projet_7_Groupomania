//Imports
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const emailValidator = require('../middleware/emailValidator');
const passwordValidator = require('../middleware/passwordValidator');
const usernameValidator = require('../middleware/usernameValidator');
const auth_user = require("../middleware/auth_user");
const usersCtrl = require("../controllers/usersCtrl");

//Routes 

router.post('/users/register/', multer, emailValidator, usernameValidator, passwordValidator, usersCtrl.register);
router.post('/users/login/', emailValidator, passwordValidator, usersCtrl.login);
router.get('/users/:userId', multer, auth_user, usersCtrl.getUserProfile);
router.put('/users/:userId/updateProfile', multer, auth_user, usersCtrl.updateUserProfile);
router.put('/users/updatePassword', auth_user, passwordValidator, usersCtrl.updateUserPassword);
router.delete('/users/:userId/deleteProfile', multer, auth_user, usersCtrl.deleteUserProfile);


//Exports

module.exports = router;