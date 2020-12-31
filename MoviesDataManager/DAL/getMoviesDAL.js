const axios = require(`axios`)

exports.getMoviesList = () => {
    return axios.get('https://api.tvmaze.com/shows')
}