const apiClient = require('api-client')

apiClient.url = 'http://localhost:5000/api'

const newsLogic = {
    userId: 'NO-ID',

    getNews(category) {
        return apiClient.getNews(category)
    },

  
    
}

module.exports = newsLogic