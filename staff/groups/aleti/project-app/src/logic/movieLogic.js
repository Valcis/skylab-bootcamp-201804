const movieLogic = {

    url: 'http://api.themoviedb.org/3',

    getTvPopular(key){
        return Promise.resolve()
        .then(()=>{
            return  fetch(`${this.url}/tv/popular?api_key=${key}&language=en-US&page=1&include_adult=false`)
            .then(resp => resp.json())
        })
    },

    getMoviesPopular(key, page = 1){
        return Promise.resolve()
        .then(()=>{
            return fetch(`${this.url}/movie/popular?api_key=${key}&language=en-US&page=${page}&include_adult=false`)
            .then(resp => resp.json())
        })
    },

    searchMulti(key, query){
        return Promise.resolve()
        .then(()=>{
            return  fetch(`${this.url}/search/multi?api_key=${key}&query=${query}&language=en-US&page=1&include_adult=false`)
            .then(resp => resp.json())
        })
    }

}

export default movieLogic