var express = require('express');
var router = express.Router();
const movieModel = require('../model/createNewMovie')
const searchModel = require('../model/searchMovie')
const dataPage = require('../model/dataPage')
const userManagement = require('../model/userManagement')


router.post('/', function(req, res, next) {
    
  if (req.body.search !== undefined) {
     res.render('searchPage',{})}
  else if (req.body.create !== undefined) { 
     res.render('creatPage',{})
  }
  else if (req.body.edit !== undefined) { 
    res.redirect('/getMenuData/edit')
 }
     
 
});
/* 4. Search Movies Page */
router.post('/getSearchResults',  async function(req, res, next) {
   
  const { name,language,genre} = req.body
 
  let data = await searchModel.getSearchResult(name,language,genre)
  console.log(data.map(v => v.same.length))
  res.render('searchResult',{ names : data});
});

router.post('/create', function(req, res, next) {


  const { name,language,genres} = req.body
  movieModel.createNewMovie(name,language,genres)
  res.render('menuPage', {user: true })
});

router.get('/edit', async function(req, res, next) {
  let data = await userManagement.getUserList()
 

  res.render('userManagementPage',{data});
});


router.get('/movieDataPage/:id', async function(req, res, next) {

  
  let n = req.url.lastIndexOf('=');
  let data = req.url.substring((n+1)).replace(/%20/g, " ");
  let obj = await dataPage.getMovieData(data)
 
  res.render('movieDataPage',{data : obj});
});

 

router.get('/userDataPage/:id', async function(req, res, next) {
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


