var express = require('express');
var router = express.Router();
const movieModel = require('../model/createNewMovie')
const searchModel = require('../model/searchMovie')
const dataPage = require('../model/dataPage')
const userManagement = require('../model/userManagement')
const checkCredit = require('../model/authentication')

/* 2. Menu Page */
router.post('/', function(req, res, next) {
//check if you are auth
 if(!req.session.auth){
  console.log(req.session)
  res.redirect('/')
 } 
  else if (req.body.search !== undefined) {
     res.render('searchPage',{})}
  else if (req.body.create !== undefined) { 
     res.render('creatPage',{})
  }
  else if (req.body.edit !== undefined) { 
    res.redirect('/getMenuData/edit')
 }
     
 
});
/* 3. Create Movies Page */
router.post('/create', function(req, res, next) {
  //check if you are auth
  if(!req.session.auth){
   console.log(req.session)
   res.redirect('/')
  }
  
  //check for valid trans credit
  //case 1 - valid trans credit
   else if(checkCredit.authCredit(req)){
   const { name,language,genres} = req.body
   movieModel.createNewMovie(name,language,genres)
   res.render('menuPage', {user: req.session.admin })
   }
  //case 2 - not valid trans credit
   else{
   var string = encodeURIComponent("your transaction credit is over! try tomorrow" );
   res.redirect('/?valid=' + string);
   }
 });
/* 4. Search Movies Page */
router.post('/getSearchResults',  async function(req, res, next) {
   //check if you are auth
 if(!req.session.auth){
  console.log(req.session)
  res.redirect('/')
 } 
 
 //check for valid trans credit
  //case 1 - valid trans credit
  else if(checkCredit.authCredit(req)){
  const { name,language,genre} = req.body
 
  let data = await searchModel.getSearchResult(name,language,genre)

  
  res.render('searchResult',{ names : data});
  
  }
   //case 2 - not valid trans credit
   else{
    var string = encodeURIComponent("your transaction credit is over! try tomorrow" );
    res.redirect('/?valid=' + string);
    }
});
/* 6.  Movies data page */
router.get('/movieDataPage/:id', async function(req, res, next) {
  //check if you are auth
  if(!req.session.auth){
   console.log(req.session)
   res.redirect('/')
  }
  //check for valid trans credit
  //case 1 - valid trans credit
  else if(checkCredit.authCredit(req)){
   let n = req.url.lastIndexOf('=');
   let data = req.url.substring((n+1)).replace(/%20/g, " ");
   let obj = await dataPage.getMovieData(data)
  
   res.render('movieDataPage',{data : obj});
  }
  //case 2 - not valid trans credit
     else{
      var string = encodeURIComponent("your transaction credit is over! try tomorrow" );
      res.redirect('/?valid=' + string);
      }
  
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
    res.redirect('/getMenuData/edit');
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


