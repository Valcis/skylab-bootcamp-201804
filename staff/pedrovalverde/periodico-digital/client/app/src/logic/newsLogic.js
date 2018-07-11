const apiClient = require('api-client')

apiClient.url = 'http://localhost:5000/api'

const newsLogic = {
    userId: 'NO-ID',

    getExternNews(category) {
        return apiClient.getExternNews(category)
    },

    saveItem(itemObject) {
        if (itemObject.title.trim().length !==0 )
            return apiClient.saveItem(itemObject)
    },

    existItem(newsId) {
        return apiClient.existOnBBDD(newsId)
    },

    getNewsById(pubDate) {
        return apiClient.getNewsById(pubDate)
    },

}

module.exports = newsLogic