var express = require('express');
var router = express.Router();
const checkLogin = require('../model/authentication')
const userManagement = require('../model/userManagement')

/* 1. login Page */
router.get('/', function (req, res, next) {
  var passedVariable = req.query.valid;
  res.render('loginPage', { err: passedVariable });
});


/* post to menuPage /loginPage */
router.post('/getLoginData', async function (req, res, next) {

 
  
  //check the user details in user.json 
  let isAuthenticted = await checkLogin.authenticationUser(req.body.userName, req.body.password)

  
  //if the user pass authentication pass to menuPage with admin permissions
  if ((isAuthenticted.length != 0) && (isAuthenticted[0].Username === 'Admin')) {
    req.session.auth=true 
    req.session.admin=true 
    req.session.transactions=true
  
    res.render('menuPage', { user: true })
  }
  else if (isAuthenticted.length != 0) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    
    //check for credit loading 
    //case 1 -  transaction credit is over!
    if(isAuthenticted[0].lastLogin === date && isAuthenticted[0].dailyTransactions === 0 )
    {
      var string = encodeURIComponent("your transaction credit is over! try tomorrow" );
      res.redirect('/?valid=' + string);
    }
      
 
    //case 2  - load credit and update date
    else if(isAuthenticted[0].lastLogin != date){
   
      isAuthenticted[0].lastLogin = date
      isAuthenticted[0].dailyTransactions =isAuthenticted[0].NumOfTransactions
      userManagement.loadCredit(isAuthenticted[0])

    }

    req.session.auth=true 
    req.session.admin=false 
    req.session.user = isAuthenticted[0].Username

    req.session.transactions=isAuthenticted[0].dailyTransactions
    

    res.render('menuPage', { user: false })
 
  }

  else {

    res.render('loginPage', { err: "The user name or password not correct" })
  }
});


/* 2. get Menu Page */
router.get('/getMenuPage', function (req, res, next) {
 //check if you are auth
 if(!req.session.auth){
 
  res.redirect('/')
 }
  res.render('menuPage', { user: req.session.admin })
});



module.exports = router;
