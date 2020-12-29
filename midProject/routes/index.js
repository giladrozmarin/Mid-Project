var express = require('express');
var router = express.Router();
const checkLogin = require('../model/authentication')

/* GET home page. */
router.get('/', function (req, res, next) {
  let appSession = req.session
  

  if (appSession?.counter) {
    appSession.counter += 1;
  }
  else {
    appSession.counter = 1
  }
  res.render('loginPage', { err: "", counter: appSession.counter });
});


/* GET home page. */
router.post('/getLoginData', async function (req, res, next) {
  let appSession = req.session

  let userLogin = { user: req.body.userName, pwd: req.body.password }
  //check the user details in user.json 
  let isAuthenticted = await checkLogin.authenticationUser(req.body.userName, req.body.password)

 
  //if the user pass authentication pass to menuPage with admin permissions
  if ((isAuthenticted.length != 0) && (isAuthenticted[0].Username === 'Admin')) {
    appSession.auth=true 
    appSession.admin=true 
   
    res.render('menuPage', { user: true })
  }
  else if (isAuthenticted.length != 0) {
    appSession.auth=true 
    appSession.admin=false 
    appSession.transactions=isAuthenticted[0].NumOfTransactions
    console.log(appSession)
    res.render('menuPage', { user: false })
  }

  else {

    res.render('loginPage', { err: "The user name or password not correct", counter: appSession.counter })
  }
});



router.get('/getMenuPage', function (req, res, next) {
  res.render('menuPage', { user: true })
});



module.exports = router;
