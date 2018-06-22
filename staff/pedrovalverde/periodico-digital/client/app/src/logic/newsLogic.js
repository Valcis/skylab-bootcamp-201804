const apiClient = require('api-client')

apiClient.url = 'http://localhost:5000/api'

const newsLogic = {
    userId: 'NO-ID',

    getNews(category) {
        return apiClient.getExternNews(category)
    },

    // TO DO : buscar si existe la noticia en MI base-> exist(pubDate){}
    
    exist (pubDate){
        return apiClient.getNewsByPubDate(pubDate)
    }
    
}

module.exports = newsLogic