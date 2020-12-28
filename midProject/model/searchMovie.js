const getMoviesDAL = require('../DAL/getMoviesDAL')
const newMoviesDAL = require('../DAL/newMovieDAL')


exports.getSearchResult = async  (name,language,genre) => {



   //step 1 : get data
   let dataFromApi = await getMoviesDAL.getMoviesList()
   let dataFromJson = await newMoviesDAL.getMovieList()
   //add two array together 
   let merge = dataFromJson.concat(dataFromApi.data);
   //step 2 : get relevant movies 
   let dataFinal =  merge.filter( x => x.name.includes(name)&& x.language.includes(language) && [...x.genres].includes(genre)) 
   //step 3: get names and genres obj 
   let get_genres =dataFinal.map( x=> ({["name"]: x.name ,["genres"] : x.genres}))
   //step 4: get all relevant movies genres
   let moviesRes = get_genres.reduce((acc,val,i)=> 
   {  
       
       let moviesFilter = dataFromApi.data.filter( x => JSON.stringify([...x.genres]) === JSON.stringify (val.genres))
       let moviesName = moviesFilter.map(x => x.name)
       let obj = {["name"]:val.name,["same"] : moviesName }
       acc.push(obj);
       return acc;
   },[]
   )
 
  return moviesRes
}