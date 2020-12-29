var express = require('express');
var router = express.Router();
const checkLogin = require('../model/authentication')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('loginPage', { err: "" });
});


/* post to menuPage /loginPage */
router.post('/getLoginData', async function (req, res, next) {

 
  
  //check the user details in user.json 
  let isAuthenticted = await checkLogin.authenticationUser(req.body.userName, req.body.password)

 
  //if the user pass authentication pass to menuPage with admin permissions
  if ((isAuthenticted.length != 0) && (isAuthenticted[0].Username === 'Admin')) {
    req.session.auth=true 
    req.session.admin=true 
   
  
    res.render('menuPage', { user: true })
  }
  else if (isAuthenticted.length != 0) {
    req.session.auth=true 
    req.session.admin=false 
    req.session.transactions=isAuthenticted[0].NumOfTransactions
    
    console.log(req.session)
    res.render('menuPage', { user: false })
  }

  else {

    res.render('loginPage', { err: "The user name or password not correct" })
  }
});


/* get to menuPage */
router.get('/getMenuPage', function (req, res, next) {
 //check if you are auth
 if(!req.session.auth){
  console.log(req.session)
  res.redirect('/')
 }
  res.render('menuPage', { user: req.session.admin })
});



module.exports = router;
