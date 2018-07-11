'use strict'

require('dotenv').config()

const { mongoose, models: { User, Apartment, Market, Task, Note } } = require('data')
const logic = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('logic (sweet-home)', () => {
    let userData, dummyUserId, apartData

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {

        userData = { name: 'Nur', surname: 'C', phone: '689456739', dni: '45629856L', password: '123', apartmentId: '5b213682489be107808607bc' }
        dummyUserId = '123456781234567812345678'
        apartData = { name: 'casa', address: 'c', phone: '23445' }

        return Promise.all([Apartment.remove(), User.remove()])

    })

    describe('register user', () => {
        it('should succeed on correct data', () =>
        Apartment.create(apartData)
        .then((apartment)=> {
            logic.registerUser('Nur', 'C', '689456739', '45629856L', '1234', apartment.id)
                .then(res => expect(res).to.be.true)
        })
    )

        it('should fail on existing dni', () => {
            User.create(userData)
                .then(() => {
                    logic.registerUser('Mar', 'L', '685243497', '45629856L', '5678', '5b213682489be107808607bc')
                        .catch(({ message }) => expect(message).to.equal(`user with dni ${userData.dni} already exists`))
                })
        })
        it('should fail on no user name', () =>
        logic.registerUser()
            .catch(({ message }) => expect(message).to.equal('name is not a string'))
    )

        it('should fail on empty user name', () =>
            logic.registerUser('')
                .catch(({ message }) => expect(message).to.equal('name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            logic.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            logic.registerUser(userData.name)
                .catch(({ message }) => expect(message).to.equal('surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            logic.registerUser(userData.name, '')
                .catch(({ message }) => expect(message).to.equal('surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            logic.registerUser(userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('surname is empty or blank'))
        )

        it('should fail on no user phone', () =>
            logic.registerUser(userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('phone is not a string'))
        )

        it('should fail on empty user phone', () =>
            logic.registerUser(userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('phone is empty or blank'))
        )

        it('should fail on blank user phone', () =>
            logic.registerUser(userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('phone is empty or blank'))
        )

        it('should fail on no user dni', () =>
        logic.registerUser(userData.name, userData.surname, userData.phone)
            .catch(({ message }) => expect(message).to.equal('dni is not a string'))
    )

        it('should fail on empty user dni', () =>
            logic.registerUser(userData.name, userData.surname, userData.phone,'')
                .catch(({ message }) => expect(message).to.equal('dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            logic.registerUser(userData.name, userData.surname,userData.phone, '     ')
                .catch(({ message }) => expect(message).to.equal('dni is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.registerUser(userData.name, userData.surname, userData.phone, userData.dni, undefined, userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.registerUser(userData.name, userData.surname,userData.phone, userData.dni, '', userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.registerUser(userData.name, userData.surname, userData.phone, userData.dni, '     ', userData.apartmentId)
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )
        it('should fail on no user apartmentId', () =>
        logic.registerUser(userData.name, userData.surname, userData.phone, userData.dni, userData.password,)
            .catch(({ message }) => expect(message).to.equal('apartmentId is not a string'))
    )

        it('should fail on empty user apartmentId', () =>
            logic.registerUser(userData.name, userData.surname,userData.phone, userData.dni, userData.password, '')
                .catch(({ message }) => expect(message).to.equal('apartmentId is empty or blank'))
        )

        it('should fail on blank user apartmentId', () =>
            logic.registerUser(userData.name, userData.surname, userData.phone, userData.dni, userData.password, '     ')
                .catch(({ message }) => expect(message).to.equal('apartmentId is empty or blank'))
        )
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    logic.authenticateUser('45629856L', '123')

                        .then(id => expect(id).to.exist)
                )
        )

        it('should fail on no user dni', () =>
            logic.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user dni is not a string'))
        )

        it('should fail on empty user dni', () =>
            logic.authenticateUser('', userData.password)
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            logic.authenticateUser('     ', userData.password)
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.authenticateUser(userData.dni)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.authenticateUser(userData.dni, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.authenticateUser(userData.dni, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })
    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return logic.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, phone, dni, _id, password } = user
                    

                    expect(name).to.equal('Nur')
                    expect(surname).to.equal('C')
                    expect (phone).to.equal('689456739')
                    expect(dni).to.equal('45629856L')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined

                })
        )

        it('should fail on no user id', () =>
            logic.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })
    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return logic.updateUser(id, 'Nur', 'C', '689456739','45629856L', '123', '456')
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
            logic.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            logic.updateUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            logic.updateUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            logic.updateUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            logic.updateUser(dummyUserId, userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            logic.updateUser(dummyUserId, userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            logic.updateUser(dummyUserId, userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user phone', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user phone is not a string'))
        )

        it('should fail on empty user phone', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on blank user phone', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on no user dni', () =>
        logic.updateUser(dummyUserId, userData.name, userData.surname,userData.phone)
            .catch(({ message }) => expect(message).to.equal('user dni is not a string'))
    )

        it('should fail on empty user dni', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname,userData.phone, '')
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )

        it('should fail on blank user dni', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname,userData.phone, '     ')
                .catch(({ message }) => expect(message).to.equal('user dni is empty or blank'))
        )
        it('should fail on no user password', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname, userData.phone, userData.dni)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname, userData.phone, userData.dni, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.updateUser(dummyUserId, userData.name, userData.surname, userData.phone, userData.dni, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('list user', () => {
        it('should succeed on correct data', () =>
            
            User.create(userData)
                .then(() => {
                    return logic.listUsers(userData.apartmentId)
                        .then(users => {
                       
                            expect(users).to.exist

                            expect(users[0].name).to.equal('Nur')
                            expect(users[0].surname).to.equal('C')
                            expect (users[0].phone).to.equal('689456739')
                            expect(users[0].dni).to.equal('45629856L')

                            expect(users[0]._id).to.exist
                            expect(users[0].password).to.exist
                        })
                })
        )
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return logic.unregisterUser(id)
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
            logic.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            logic.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            logic.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

       
    })
    describe('register apartment', () => {
        it('should succeed on correct data', () =>
            logic.registerApartment('sky', 'C', '689456739')
            .then(id => expect(id).to.exist)
        )
    }) 

    describe('list apartment', () => {
        it('should succed on correct data', () => {

            Apartment.create(apartData)
               .then(apartment =>{
                   return logic.listApartment(apartment.id)
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
    describe('udpate apartment', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
                .then(({ id }) => {
                    return logic.updateApartment(id, 'sky', 'e', '689456739','mike', 'gr')
                        .then(res => {
                            expect(res).to.be.true

                            return Apartment.findById(id)
                        })
                        .then(apartment => {
                            expect(apartment).to.exist

                            const { name, address, phone, owner, realState } = apartment
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
               .then(apartment =>{
                   return logic.apartmentExists(apartment.id)
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
            .then(apartment=>{
                User.create({name: 'Nur', surname: 'C', phone: '689456739', dni: '45629856L', password: '123', apartmentId: apartment.id})
                .then(id =>{
                    return logic.deleteApartment(id)
                    .then(res => {
                        expect(res).to.be.true

                        return Apartment.findById(id)
                    })
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
            .then(apartment=>{
                return logic.addTasks('clean', apartment.id)
                .then(id => expect(id).to.exist)
            })
        )
    }) 
    describe('list task', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'clean'
                Task.create({name, apartmentId})
                .then(id =>{
                    
                    return logic.listTasks(apartmentId)
                    .then(task =>{
                    expect(task[0].name).to.equal('clean')
                    expect(task[0].id).to.exist
                   
                    })
                })
            })
        )
    }) 
    describe('delete task', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'clean'
                Task.create({name, apartmentId})
                .then(id =>{
                    return logic.deleteTask(id)
                    .then(res => {
                        expect(res).to.be.true

                        return Task.findById(id)
                    })
                    .then(task => {
                        expect(task).to.be.null
                    })
                })
            })
        )
    }) 
    describe('add market', () => {
        it('should succeed on correct data', () =>

            Apartment.create(apartData)
            .then(apartment=>{
                return logic.addMarket('buy', apartment.id)
                .then(id => expect(id).to.exist)
            })
        )
    }) 
    
    describe('list market', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'buy'
                Market.create({name, apartmentId})
                .then(id =>{
                    
                    return logic.listMarket(apartmentId)
                    .then(market =>{
                    expect(market[0].name).to.equal('buy')
                    expect(market[0].apartmentId).to.exist
                   
                    })
                })
            })
        )
    }) 
    describe('delete market', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'buy'
                Market.create({name, apartmentId})
                .then(id =>{
                    return logic.deleteMarket(id)
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
            .then(apartment=>{
                
                return logic.addNotes('go', apartment.id)
                .then(res => {
                    expect(res.id).to.exist
                    
                    
                })
                
                
            })
        )
    }) 
    describe('list notes', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'go'
                Note.create({name, apartmentId})
                .then(() =>{
                    return logic.listNotes(apartmentId)
                    .then(notes =>{
                    expect(notes[0].name).to.equal('go')
                    expect(notes[0].apartmentId).to.exist
                   
                    })
                })
            })
        )
    }) 
    describe('delete notes', () => {
        it('should succeed on correct data', () =>
            Apartment.create(apartData)
            .then(apartment=>{
                const apartmentId= apartment.id
                const name= 'go'
                Note.create({name, apartmentId})
                .then(id =>{
                    return logic.deleteNote(id)
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
