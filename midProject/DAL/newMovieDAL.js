const js = require('jsonfile')

exports.addNewMovie = (obj) => {
    
js.writeFile(`${__dirname}/../DataSource/NewMovies.json`,obj, err => err? err : console.log("success") )
}

exports.getMovieList = () => 

{
    return new Promise ( (res,rej) => 
    
    js.readFile(`${__dirname}/../DataSource/NewMovies.json`,(err,data) => err? rej(err) : res(data))
    
    )
}

 
