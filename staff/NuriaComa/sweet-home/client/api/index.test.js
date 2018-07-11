'use strict'

require('dotenv').config()

const { mongoose, models: { User, Apartment, Task, Note, Market } } = require('data')
const shApi = require('./index')
const { expect } = require('chai')
const axios = require('axios')
const jwt = require('jsonwebtoken')


const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

shApi.url = API_URL

describe('logic (sweet-home)', () => {
    const userData = { name: 'Nur', surname: 'C', phone: '689456739', dni: '45629856L', password: '123', apartmentId: '5b213682489be107808607bc' }
    const exempleID = '987654321234537812345375'
    const apartData = { name: 'casa', address: 'c', phone: '23445' }

    before(() => mongoose.connect(DB_URL))
    beforeEach(() => {

       

        return Promise.all([Apartment.remove(), User.remove()])

    })
    //beforeEach(() => User.remove())

    describe('register user', () => {
        it('should succeed on correct data', () =>
           
                shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                    .then(res => expect(res).to.be.true)
            
        )

        it('should fail on existing dni', () => {
            User.create(userData)
                .then(() => {
                    return shApi.registerUser('Mar', 'L', '685243497', '45629856L', '5678', '5b213682489be107808607bc')
                })
                .catch(({ message }) => expect(message).to.equal(`user with dni ${userData.dni} already exists`))
        })
        it('should fail on no user name', () =>
        shApi.registerUser(undefined, userData.surname, userData.phone, userData.dni,userData.password ,userData.apartmentId)
            .catch(({ message }) => expect(message).to.equal('name is not a string'))
    )

        it('should fail on empty user name', () =>
            shApi.registerUser('')
                .catch(({ message }) => expect(message).to.equal('name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            shApi.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            shApi.registerUser(userData.name)
                .catch(({ message }) => expect(message).to.equal('surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            shApi.registerUser(userData.name, '')
                .catch(({ message }) => expect(message).to.equal('surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            shApi.registerUser(userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('surname is empty or blank'))
        )

        it('should fail on no user phone', () =>
            shApi.registerUser(userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('phone is not a string'))
        )

        it('should fail on empty user phone', () =>
            shApi.registerUser(userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('phone is empty or blank'))
        )

        it('should fail on blank user phone', () =>
            shApi.registerUser(userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('phone is empty or blank'))
        )

        it('should fail on no user dni', () =>
        shApi.registerUser(userData.name, userData.surname, userData.phone)
            .catch(({ message }) => expect(message).to.equal('dni is not a string'))
    )

        it('should fail on empty user dni', () =>
            shApi.registerUser(userData.name, userData.surname, userData.phone,'')
                .catch(({ message }) => expect(message).to.equal('dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            shApi.registerUser(userData.name, userData.surname,userData.phone, '     ')
                .catch(({ message }) => expect(message).to.equal('dni is empty or blank'))
        )

        it('should fail on no user password', () =>
            shApi.registerUser(userData.name, userData.surname, userData.phone, userData.dni, undefined, userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty user password', () =>
            shApi.registerUser(userData.name, userData.surname,userData.phone, userData.dni, '', userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            shApi.registerUser(userData.name, userData.surname, userData.phone, userData.dni, '     ', userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )
        it('should fail on no user apartmentId', () =>
            shApi.registerUser(userData.name, userData.surname, userData.phone, userData.dni,userData.password )
                .catch(({ message }) => expect(message).to.equal('apartmentId is not a string'))
        )

        it('should fail on empty user apartmentId', () =>
            shApi.registerUser(userData.name, userData.surname,userData.phone, userData.dni,userData.password , '')
                .catch(({ message }) => expect(message).to.equal('apartmentId is empty or blank'))
        )

        it('should fail on blank user apartmentId', () =>
            shApi.registerUser(userData.name, userData.surname, userData.phone, userData.dni,userData.password , '     ')
                .catch(({ message }) => expect(message).to.equal('apartmentId is empty or blank'))
        )
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    shApi.authenticateUser('45629856L', '123')
                        .then(id => {
                            expect(id).to.exist

                            expect(shApi.token()).not.to.equal('NO-TOKEN')
                        })
                )
        )

        it('should fail on no user dni', () =>
            shApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user dni is not a string'))
        )

        it('should fail on empty user dni', () =>
            shApi.authenticateUser('', userData.password)
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            shApi.authenticateUser('     ', userData.password)
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on no user password', () =>
            shApi.authenticateUser(userData.dni)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            shApi.authenticateUser(userData.dni, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            shApi.authenticateUser(userData.dni, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })
    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, phone, dni, _id, password } = user.data
                    
                    expect(name).to.equal('Nur')
                    expect(surname).to.equal('C')
                    expect (phone).to.equal('689456739')
                    expect(dni).to.equal('45629856L')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    
                })
        )

        it('should fail on no user id', () =>
            shApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            shApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            shApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })
    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {

                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.updateUser(id, 'Nur', 'C', '689456739','45629856L', '123', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { name, surname, phone, dni, password } = user

                            expect(user.id).to.equal(id)
                            expect(name).to.equal('Nur')
                            expect(surname).to.equal('C')
                            expect(phone).to.equal('689456739')
                            expect(dni).to.equal('45629856L')
                            expect(password).to.equal('456')
                        })
                })
        )


        it('should fail on no user id', () =>
            shApi.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            shApi.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            shApi.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            shApi.updateUser(exempleID)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            shApi.updateUser(exempleID, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            shApi.updateUser(exempleID, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            shApi.updateUser(exempleID, userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            shApi.updateUser(exempleID, userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            shApi.updateUser(exempleID, userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user phone', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user phone is not a string'))
        )

        it('should fail on empty user phone', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on blank user phone', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on no user dni', () =>
        shApi.updateUser(exempleID, userData.name, userData.surname,userData.phone)
            .catch(({ message }) => expect(message).to.equal('user dni is not a string'))
    )

        it('should fail on empty user dni', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname,userData.phone, '')
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname,userData.phone, '     ')
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )
        it('should fail on no user password', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname, userData.phone, userData.dni)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname, userData.phone, userData.dni, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            shApi.updateUser(exempleID, userData.name, userData.surname, userData.phone, userData.dni, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('list user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.listUsers(userData.apartmentId)
                })
                .then(users => {
                    expect(users).to.exist
                    
                    expect(users[0].name).to.equal('Nur')
                    expect(users[0].surname).to.equal('C')
                    expect (users[0].phone).to.equal('689456739')
                    expect(users[0].dni).to.equal('45629856L')

                    expect(users[0]._id).to.exist
                    expect(users[0].password).to.exist
                    
        
                })
        )
    })
   describe('unregister user', () => {

        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {

                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)
                    
                    return shApi.unregisterUser(id)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )
    
        it('should fail on no user id', () =>
            shApi.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            shApi.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            shApi.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

       
     })
    describe('register apartment', () => {
    it('should succeed on correct data', () =>
        
            shApi.registerApartment('casa', 'c','23445')
            .then(id => expect(id).to.exist)
    )

    })
    describe('list apartment', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
                .then( apartment  => {
                    const token = jwt.sign( apartment.id , TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.listApartment(apartment.id)
                })
                .then(apartments => {
                       
                    expect(apartments).to.exist

                    expect(apartments.name).to.equal('casa')
                    expect(apartments.address).to.equal('c')
                    expect (apartments.phone).to.equal('23445')

                    expect(apartments._id).to.exist
                })
        )
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
                .then(({ id }) => {

                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.updateApartment(id, 'sky', 'e', '689456739','mike', 'gr')
                    .then(res => {
                        expect(res).to.be.true

                        return Apartment.findById(id)
                    })
                    .then(apartment => {
                        expect(apartment).to.exist

                        const { name, address, phone} = apartment
                        expect(apartment.id).to.equal(id)
                        expect(name).to.equal('sky')
                        expect(address).to.equal('e')
                        expect(phone).to.equal('689456739')
                       
                    })
                })
        )
    })
    describe('apartment exists', () => {
        it('should succed on correct data', () => {

            Apartment.create(apartData)
               .then(({ id }) =>{

                const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                   return shApi.listExistingApartment(id)
                   .then(apartments => {
                       
                       
                    expect(apartments).to.exist

                    expect(apartments.name).to.equal('casa')
                    expect(apartments.address).to.equal('c')
                    expect (apartments.phone).to.equal('23445')

                    expect(apartments._id).to.exist
                })
       
               })
        })
    })
    describe('delete apartment', () => {
        it('should succeed on correct data', () =>
                Apartment.create(apartData)
                .then(({ id }) =>{

                const token = jwt.sign({ id }, TOKEN_SECRET)

                    shApi.token(token)

                    return shApi.deleteApartment(id)
                    .then(res => {
                        
                        expect(res).to.be.true
                        
                        return Apartment.findById(id)
                        .then(apartment => {
                            expect(apartment).to.be.null
                        })
                    })
                
            })
        )
    }) 
    describe('add task', () => {
        it('should succeed on correct data', () =>

            Apartment.create(apartData)
            .then(({ id }) =>{

            const token = jwt.sign({ id }, TOKEN_SECRET)

                shApi.token(token)

                return shApi.addTasks('clean', id)
                .then(id => expect(id).to.exist)
            })
        )
    }) 
    describe('list task', () => {
        it('should succeed on correct data', () =>
           
            Apartment.create(apartData)
            .then(apartment =>{
                
                
                const token = jwt.sign( apartment.id , TOKEN_SECRET)

                shApi.token(token)
                const apartmentId = apartment.id
                const name= 'clean'
                
                Task.create({name ,apartmentId})
                
                    return shApi.listTasks(apartmentId)
                    .then(task =>{
                       
                    expect(task[0].name).to.equal('clean')
                    expect(task[0]._id).to.exist
                   
                    })
                
            })
        )
    }) 
    
    describe('delete task', () => {
        it('should succeed on correct data', () =>
                Apartment.create(apartData)

                .then(apartment =>{
                
                const token = jwt.sign( apartment.id , TOKEN_SECRET)

                shApi.token(token)

                const apartmentId= apartment.id
                const name= 'clean'
                Task.create({name, apartmentId})
                .then(task =>{

                    
                    return shApi.deleteTask(task.id)
                    .then(res => {
                        expect(res).to.be.true

                        return Task.findById(id)
                        .then(task => {
                            expect(task).to.be.null
                    })
                    })
                })
            })
        )
    }) 
    describe('add market', () => {
        it('should succeed on correct data', () =>

            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)
                return shApi.addMarket('buy', apartment.id)
                .then(id =>{
                 expect(id.data.id).to.exist
                })
            })
        )
    }) 

    describe('list market', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)

                const apartmentId= apartment.id
                const name= 'buy'
                Market.create({name, apartmentId})
                .then(market =>{
                   
                    
                })
                return shApi.listMarket(apartmentId)
                .then(market =>{

                expect(market[0].name).to.equal('buy')
                expect(market[0].apartmentId).to.exist
                })
            })
        )
    }) 
    describe('delete market', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)
                const apartmentId= apartment.id
                const name= 'buy'
                Market.create({name, apartmentId})
                .then(id =>{

                    return shApi.deleteMarket(id._id)
                    .then(res => {
                        expect(res).to.be.true

                        return Market.findById(id)
                    })
                    .then(market => {
                        expect(market).to.be.null
                    })
                })
            })
        )
    }) 

    describe('add notes', () => {
        it('should succeed on correct data', () =>

            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)
                    
                return shApi.addNotes('go', apartment.id)
                .then(res => {

                    expect(res.data.id).to.exist
                    
                    
                })
                
                
            })
        )
    }) 

    describe('list notes', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)
                const apartmentId= apartment.id
                const name= 'go'
                Note.create({name, apartmentId})
                .then(notes =>{
                    
                })
                return shApi.listNotes(apartmentId)
                .then(notes =>{
                expect(notes[0].name).to.equal('go')
                expect(notes[0].apartmentId).to.exist
                })
            })
        )
    }) 

    describe('delete notes', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)

            .then(apartment =>{
            
            const token = jwt.sign( apartment.id , TOKEN_SECRET)

            shApi.token(token)
                const apartmentId= apartment.id
                const name= 'go'
                Note.create({name, apartmentId})
                .then(id =>{

                    return shApi.deleteNote(id.id)
                    .then(res => {
                        
                        expect(res).to.be.true

                        return Note.findById(id)
                        .then(notes => {
                            expect(notes).to.be.null
                        })
                    })
                })
            })
        )
    }) 







after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
