const {expect}= require('chai')
const {env: {DB_URL, API_URL}}= process

describe('logic testing', ()=>{
    const userData = {
        email: 'aperacaula@gmail.com',
        password: '12345',
        personalData: new PersonalData({

            name: 'Alex',
            surname: 'Peracaula',
            birthDate: new Date('10/07/1993'),
            sex: 'male',
            twins: true,
            province: 'Barcelona',
            phone: 630075725

        }),

        physicalData: {

            height: 1.77,
            weight: 67,
            physicalCondition: 'fit',
            eyes: 'green',
            hair: 'buzzed',
            ethnicity: 'caucasian',
            beard: true,
            tattoos: true,
            piercings: false

        },

        professionalData: {

            profession: 'actor/actress',
            singing: true,
            dancing: true,
            otherHabilities: 'surfing',
            previousJobExperiences: 20,
            

        },

        videobookLink: 'https://youtube.com',

        profilePicture: 'http://res.cloudinary.com/dt6qv2j4j/image/upload/v1528803579/uvcv0wzsqe9sjrabd9ca.jpg',

        applications: []
    }



    describe('register user',()=>{



    })




})