var express = require('express');
var router = express.Router();
const userManagement = require('../model/userManagement')

/* 8.  User data page */
router.post('/',  async function(req, res, next) {

    let obj = {
     ["Username"]:req.body.Username,
     ["Password"]:req.body.Password,
     ["CreatedDate"]:req.body.CreatedDate,
     ["NumOfTransactions"]:parseInt(req.body.NumOfTransactions)
     
    }

    userManagement.updateUser(obj)
    res.redirect('/getMenuData/edit');
});


module.exports = router;

