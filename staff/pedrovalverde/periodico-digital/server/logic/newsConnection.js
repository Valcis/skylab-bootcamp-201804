'use strict'

const axios = require('axios')

const conection = {

    /* abc : {
        introduction: 'http://www.abc.es/rss/feeds/abcPortada.xml',
        spain: 'http://www.abc.es/rss/feeds/abc_EspanaEspana.xml',
        international: 'http://www.abc.es/rss/feeds/abc_Internacional.xml',
        sports: 'http://www.abc.es/rss/feeds/abc_Deportes.xml',
        economy: 'http://www.abc.es/rss/feeds/abc_Economia.xml',
        politics: 'http://www.abc.es/rss/feeds/abc_Politica.xml',
        culture: 'http://www.abc.es/rss/feeds/abc_Cultura.xml',
        tecnology: 'http://www.abc.es/rss/feeds/abc_Tecnologia.xml',
        health: 'http://www.abc.es/rss/feeds/abc_SociedadSalud.xml',
    },

    minutos20 : {
        introduction: 'https://www.20minutos.com/rss',
    },

    elconfidencial: {
        general: 'https://rss.elconfidencial.com/rss/'
    }, */

    converter: 'https://api.rss2json.com/v1/api.json',

    getNews(section) {

        
        let api_key_google = 'rctozux60qq0jkynqwpwl45cc3j4kylqltucas7k' // Generada con registro mediante cuenta de google
        let api_key_this = 'apabksulqoq5ltg6uoodnje6qu1ssfticnkzd2zp'

        let feed = ''

        switch (section) {
            //case 'introduction': feed = 'http://www.abc.es/rss/feeds/abc_Deportes.xml'; break;
            case 'introduction': feed = 'http://www.abc.es/rss/feeds/abcPortada.xml'; break;
            case 'spain': feed = 'http://www.abc.es/rss/feeds/abc_EspanaEspana.xml'; break;
            case 'international': feed = 'http://www.abc.es/rss/feeds/abc_Internacional.xml'; break;
            case 'sports': feed = 'http://www.abc.es/rss/feeds/abc_Deportes.xml'; break;
            case 'economy': feed = 'http://www.abc.es/rss/feeds/abc_Economia.xml'; break;
            case 'politics': feed = 'http://www.abc.es/rss/feeds/abc_Politica.xml'; break;
            case 'culture': feed = 'http://www.abc.es/rss/feeds/abc_Cultura.xml'; break;
            case 'tecnology': feed = 'http://www.abc.es/rss/feeds/abc_Tecnologia.xml'; break;
            case 'health': feed = 'http://www.abc.es/rss/feeds/abc_SociedadSalud.xml'; break;
        }
console.log("conection to : ",`${this.converter}?rss_url=${feed}&api_key=${api_key_google}&order_by=pubDate&order_dir=desc&count=15`);
        return axios.get(`${this.converter}?rss_url=${feed}&api_key=${api_key_google}&order_by=pubDate&order_dir=desc&count=15`)
            .then(res => res.data)
            .catch(err => err)
    },
}

module.exports = conection