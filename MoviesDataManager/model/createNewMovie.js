const newMovieDAL = require (`../DAL/newMovieDAL`)



exports.createNewMovie = async (name,language,genres) =>
{

  

    let data = await newMovieDAL.getMovieList()
    //get current json 
    
     //get the current id and add 1
     let id = data[Object.keys(data)[Object.keys(data).length - 1]].id +1
  
     //data shaping 
     let obj = {
         "id": id,
         "name": name,
         "language": language,
         "genres": genres
               }
     data.push(obj)
    
    newMovieDAL.addNewMovie(data)
}