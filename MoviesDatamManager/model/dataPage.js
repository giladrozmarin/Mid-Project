const getMoviesDAL = require('../DAL/getMoviesDAL')
const newMoviesDAL = require('../DAL/newMovieDAL')

exports.getMovieData = async (name) => {

    //step 1 : get data 
    let dataFromApi = await getMoviesDAL.getMoviesList()
    let dataFromJson = await newMoviesDAL.getMovieList()
    //add two array together 
    let merge = dataFromJson.concat(dataFromApi.data);
    //step 2 : get relevant movies 
    let dataFinal = merge.filter( x => x.name === name)
    //data shaping
    let obj = {
        ["id"]:dataFinal[0]?.id,
        ["name"]: dataFinal[0]?.name,
        ["Genres"]: dataFinal[0]?.genres,
        ["Language"]: dataFinal[0]?.language,
        ["Picture"]: dataFinal[0]?.image?.medium
    }
    console.log(obj)
    return obj

}
