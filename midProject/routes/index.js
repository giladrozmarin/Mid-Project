var express = require('express');
var router = express.Router();
const checkLogin = require('../model/authentication')

/* GET home page. */
router.get('/', function(req, res, next) {
  let appSession = req.session
  if(appSession?.counter)
  {
    appSession.counter += 1;
  }
  else
  {
    appSession.counter = 1
  }
  res.render('loginPage', { err :"" ,counter : appSession.counter} );
});


/* GET home page. */
router.post('/getLoginData', async function(req, res, next) {
  let appSession = req.session
  let userLogin = {user : req.body.userName, pwd : req.body.password}
  //check the user details in user.json 
  let isAuthenticted  = await checkLogin.authenticationUser(req.body.userName,req.body.password)
  console.log(  isAuthenticted.length != 0)

  //if the user pass authentication pass to menuPage
  isAuthenticted.length != 0 ?
  res.render('menuPage', {user: true }):
  res.render('loginPage', {err :"The user name or password not exist" ,counter : appSession.counter})
 


});

module.exports = router;
