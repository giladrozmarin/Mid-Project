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
    res.redirect('/manage/edit');
});

/* 7.  User management  page */
router.get('/edit', async function(req, res, next) {
    //check if you are auth
    if(!req.session.auth){
     console.log(req.session)
     res.redirect('/')
    }
     let data = await userManagement.getUserList()
     res.render('userManagementPage',{data});
   });
   
/* 7.  User management  page */
router.get('/userDataPage/:id', async function(req, res, next) {
     if(!req.session.auth){
       console.log(req.session)
       res.redirect('/')
      } 
     let n = req.url.lastIndexOf('=');
     let data = req.url.substring((n+1)).replace(/%20/g, " ").split(" ")
     if(data[1] === 'delete')
     {
       userManagement.deleteUser(data[0])
       res.redirect('/manage/edit');
     }
     if(data[1] === 'update')
     {
        
       let obj = await userManagement.getUser(data[0])
       
       res.render('userDataPage',{obj});
     }
     else{
       let obj =undefined
       res.render('userDataPage',{obj});
     }
   });
   


module.exports = router;

