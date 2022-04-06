//Imports
var express = require("express");
var router = express.Router();
var usersCtrl = require("../controllers/usersCtrl");
//TODO : implemant auth middleware here 

//Routes 

router.post('/users/register/', usersCtrl.register);
router.post('/users/login/', usersCtrl.login);
router.get('/users/me/', usersCtrl.getUserProfile);
router.put('/users/me/', usersCtrl.updateUserProfile);

//Exports

module.exports = router;