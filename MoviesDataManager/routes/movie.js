var express = require('express');
var router = express.Router();
const checkCredit = require('../model/authentication')
const movieModel = require('../model/createNewMovie')
const searchMovie = require('../model/searchMovie')
const dataPage = require('../model/dataPage')
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
 
  let data = await searchMovie.getSearchResult(name,language,genre)

  
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
 
module.exports = router;
