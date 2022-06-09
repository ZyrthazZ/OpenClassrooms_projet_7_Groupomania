//Imports
const express = require("express");
const router = express.Router();
const multerProfilePic = require("../middleware/multer-config-profilePic");
const emailValidator = require('../middleware/emailValidator');
const passwordValidator = require('../middleware/passwordValidator');
const usernameValidator = require('../middleware/usernameValidator');
const auth_user = require("../middleware/auth_user");
const usersCtrl = require("../controllers/usersCtrl");

//Routes 

router.post('/users/register/', multerProfilePic, emailValidator, usernameValidator, passwordValidator, usersCtrl.register);
router.post('/users/login/', emailValidator, passwordValidator, usersCtrl.login);
router.get('/users/:userId', multerProfilePic, auth_user, usersCtrl.getUserProfile);
router.put('/users/:userId/updateProfile', auth_user, multerProfilePic, usersCtrl.updateUserProfile);
router.put('/users/updatePassword', auth_user, passwordValidator, usersCtrl.updateUserPassword);
router.delete('/users/:userId/deleteProfile', multerProfilePic, auth_user, usersCtrl.deleteUserProfile);


//Exports

module.exports = router;