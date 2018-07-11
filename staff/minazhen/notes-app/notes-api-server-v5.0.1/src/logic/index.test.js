'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const { User, Note } = require('../models')

const { env: { DB_URL } } = process

describe('logic (notes & users)', () => {
    const uName = "John"
    const uSurname = "Doe"
    const uEmail = "jd@mail.com"
    const uPass = "123"
    const uText = "note"
    const fakeid = "123456781234567812345678"
    let randoms = [];

    // before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))
    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count =  Math.floor(Math.random() * 6) + 3
        randoms.length = 0
        while (count--) randoms.push(count)
        return Promise.all([User.remove()])
    })
    describe("users", () => {

        describe('register user (name, surname, email, password)', () => {
            it('should succeed on correct dada', () =>
                logic.registerUser(uName, uSurname, uEmail, uPass)
                    .then(res => expect(res).toBeTruthy())
            )
    
            it("should succeed with different users", () => {
                const promises = randoms.map((v, i) => logic.registerUser(uName, uSurname, `email${i}@mail.com`, uPass))
    
                return Promise.all(promises)
                .then(res => {
                    return User.find({}, null, {sort: {email: 1}})
                    .then(res => {
                        expect(res).toBeTruthy()
                        expect(res.length).toBe(randoms.length)
                        for (let i = 0; i < res.length; i++){
                            expect(res[i].email).toBe(`email${i}@mail.com`)
                        }
                    })
                })
            })
    
            describe("errors", () => {
                it("should throw error if user already exists", () => 
                    User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                        .then(() => logic.registerUser(uName, uSurname, uEmail, uPass))
                        .catch(({ message }) => expect(message).toBe(`User with email ${uEmail} already exists`))
                )
        
                it("should throw error on no user name", () =>
                    logic.registerUser(undefined, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User name is not a string"))
                )
        
                it("should throw error on empty user name", () =>
                    logic.registerUser("", uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User name is empty or blank"))
                )
        
                it("should throw error on blank user name", () =>
                logic.registerUser("    ", uSurname, uEmail, uPass)
                    .catch(({ message }) => expect(message).toBe("User name is empty or blank"))
                )
        
                it("should throw error on no user surname", () =>
                    logic.registerUser(uName, undefined, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User surname is not a string"))
                )
        
                it("should throw error on empty user surname", () =>
                    logic.registerUser(uName, "", uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User surname is empty or blank"))
                )
        
                it("should throw error on blank user surname", () =>
                logic.registerUser(uName, "    ", uEmail, uPass)
                    .catch(({ message }) => expect(message).toBe("User surname is empty or blank"))
                )
        
                it("should throw error on no user email", () =>
                logic.registerUser(uName, uSurname, undefined, uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a string"))
                )
        
                it("should throw error on empty user email", () =>
                    logic.registerUser(uName, uSurname, "", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
        
                it("should throw error on blank user email", () =>
                logic.registerUser(uName, uSurname, "    ", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
        
                it("should throw error on email without @", () =>
                logic.registerUser(uName, uSurname, "jdmail.com", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
        
                it("should throw error on email without .", () =>
                logic.registerUser(uName, uSurname, "jd@mail", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
        
                it("should throw error on email with special characters", () =>
                logic.registerUser(uName, uSurname, "jd@m^/ail.com", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
        
                it("should throw error on no user password", () =>
                logic.registerUser(uName, uSurname, uEmail, undefined)
                    .catch(({ message }) => expect(message).toBe("User password is not a string"))
                )
        
                it("should throw error on empty user password", () =>
                    logic.registerUser(uName, uSurname, uEmail, "")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )
        
                it("should throw error on blank user password", () =>
                logic.registerUser(uName, uSurname, uEmail, "    ")
                    .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )
    
            })
        })
    
        describe('authenticate user (email, password)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(() =>
                        logic.authenticateUser(uEmail, uPass)
                            .then(id => expect(id).toBeDefined())
                    )
            )
    
            describe("errors", () => {
                it("should fail on wrong mail", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(() =>
                        logic.authenticateUser("wrong@mail.com", uPass)
                            .catch(({ message }) => expect(message).toBe("wrong credentials"))
                    )
                )
    
                it("should fail on wrong password", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(() =>
                        logic.authenticateUser(uEmail, "wrong-password")
                            .catch(({ message }) => expect(message).toBe("wrong credentials"))
                    )
                )
    
                it("should throw error on empty user email", () =>
                logic.authenticateUser("", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
    
                it("should throw error on blank user email", () =>
                logic.authenticateUser("    ", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
    
                it("should throw error on email without @", () =>
                logic.authenticateUser(uName, uSurname, "jdmail.com", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
        
                it("should throw error on email without .", () =>
                logic.authenticateUser("jd@mail", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
        
                it("should throw error on email with special characters", () =>
                logic.authenticateUser("jd@m^/ail.com", uPass)
                    .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
    
                    
                it("should throw error on no user password", () =>
                logic.authenticateUser(uEmail, undefined)
                    .catch(({ message }) => expect(message).toBe("User password is not a string"))
                )
        
                it("should throw error on empty user password", () =>
                    logic.authenticateUser(uEmail, "")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )
        
                it("should throw error on blank user password", () =>
                logic.authenticateUser(uEmail, "    ")
                    .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )
    
            })
        })
    
        describe('retrieve user (userId)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.retrieveUser(id)
                    })
                    .then(user => {
                        expect(user).toBeDefined()
    
                        const { id, name, surname, email, _id, password, notes } = user
    
                        expect(id).toBeDefined()
                        expect(name).toBe(uName)
                        expect(surname).toBe(uSurname)
                        expect(email).toBe(uEmail)
    
                        expect(_id).toBeUndefined()
                        expect(password).toBeUndefined()
                        expect(notes).toBeUndefined()
                    })
            )
    
            it("should succeed with different users", () => {
                const promises = randoms.map((v, i) => logic.registerUser(uName, uSurname, `email${i}@mail.com`, uPass))
    
                return Promise.all(promises)
                .then(res => {
                    return User.find({}, null, {sort: {email: 1}})
                })
                .then(users => {
                    expect(users).toBeTruthy()
                    expect(users.length).toBe(randoms.length)
                    return logic.retrieveUser(users[2].id)
    
                    .then(user => {
                        expect(user).toBeDefined()
    
                        const { id, name, surname, email, _id, password, notes } = user
    
                        expect(id).toBeDefined()
                        expect(name).toBe(uName)
                        expect(surname).toBe(uSurname)
                        expect(email).toBe(`email2@mail.com`)
    
                        expect(_id).toBeUndefined()
                        expect(password).toBeUndefined()
                        expect(notes).toBeUndefined()
                    })
                })
            })
    
            describe("errors", () => {
                it("should fail on wrong id number", () =>
                    User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                        .then(() => {
                            return logic.retrieveUser(fakeid)
                                .catch(({ message }) => expect(message).toBe(`no user found with id ${fakeid}`))
                        })
                )
        
                it("should throw error if id length is not 24", () =>
                    logic.retrieveUser('56cb91bd')
                        .catch(({ message }) => expect(message).toBe("id has not a right format"))   
                )
    
                it("should throw error if id length is not a string", () =>
                    logic.retrieveUser({})
                        .catch(({ message }) => expect(message).toBe("id has not a right format"))    
                )
            })
        })
    
        describe("update user (userId, name, surname, email, password, newEmail, newPassword)", () => {
            it("should succeed on correct data", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
                            .then(res => {
                                expect(res).toBeTruthy()
    
                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()
    
                                const { name, surname, email, password } = user
    
                                expect(user.id).toBe(id)
                                expect(name).toBe('Jack')
                                expect(surname).toBe('Wayne')
                                expect(email).toBe('jw@mail.com')
                                expect(password).toBe('456')
                            })
                    })
            )

            it("should succeed if user changes his own mail to the same", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jd@mail.com', '456')
                            .then(res => {
                                expect(res).toBeTruthy()

                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()

                                const { name, surname, email, password } = user

                                expect(user.id).toBe(id)
                                expect(name).toBe('Jack')
                                expect(surname).toBe('Wayne')
                                expect(email).toBe('jd@mail.com')
                                expect(password).toBe('456')
                            })
                    })
            )

            it("should succeed and not change if user leaves empty new user email", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", "", "456")
                            .then(res => {
                                expect(res).toBeTruthy()

                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()

                                const { name, surname, email, password } = user

                                expect(user.id).toBe(id)
                                expect(name).toBe("Jack")
                                expect(surname).toBe("Wayne")
                                expect(email).toBe("jd@mail.com")
                                expect(password).toBe("456")
                            })
                    })
            )

            it("should succeed and not change if user leaves empty new user password", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", "jw@mail.com", "")
                            .then(res => {
                                expect(res).toBeTruthy()

                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()

                                const { name, surname, email, password } = user

                                expect(user.id).toBe(id)
                                expect(name).toBe("Jack")
                                expect(surname).toBe("Wayne")
                                expect(email).toBe("jw@mail.com")
                                expect(password).toBe("123")
                            })
                    })
            )

            it("should succeed and not change if new user email is undefined", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", undefined, "456")
                            .then(res => {
                                expect(res).toBeTruthy()

                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()

                                const { name, surname, email, password } = user

                                expect(user.id).toBe(id)
                                expect(name).toBe("Jack")
                                expect(surname).toBe("Wayne")
                                expect(email).toBe("jd@mail.com")
                                expect(password).toBe("456")
                            })
                    })
            )

            it("should succeed and not change if new user password is undefined", () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.updateUser(id, "Jack", "Wayne", "jd@mail.com", "123", "jw@mail.com", undefined)
                            .then(res => {
                                expect(res).toBeTruthy()

                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()

                                const { name, surname, email, password } = user

                                expect(user.id).toBe(id)
                                expect(name).toBe("Jack")
                                expect(surname).toBe("Wayne")
                                expect(email).toBe("jw@mail.com")
                                expect(password).toBe("123")
                            })
                    })
            )

            describe("errors", () => {
                it("should throw an error change an email to other already in use", () =>
                    User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                        .then(() => {
                            return User.create({ name: uName, surname: uSurname, email: "jw@mail.com", password: uPass })
                            .then(({ id }) => {
                                return logic.updateUser(id, 'Jack', 'Wayne', 'jw@mail.com', '123', 'jd@mail.com', '456')
                                .catch(({ message }) => expect(message).toBe(`user with email jd@mail.com already exists`))
                            })
                        })
                )

                it("should throw error on undefined user id", () => 
                    logic.updateUser(undefined, uName, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                )

                it("should throw error on user id that is not a string", () => 
                    logic.updateUser({}, uName, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                )

                it("should throw error on empty user id", () => 
                    logic.updateUser("", uName, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                )

                it("should throw error on blank user id", () => 
                    logic.updateUser("  ", uName, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                )

                it("should throw error on wrong length user id", () => 
                    logic.updateUser("123", uName, uSurname, uEmail, uPass)   
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                )
            
                it("should throw error on no user name", () =>  
                    logic.updateUser(fakeid, undefined, uSurname, uEmail, uPass)
                    .catch(({ message }) => expect(message).toBe("User name is not a string"))    
                )

                it("should throw error on user name that is not a string", () => 
                    logic.updateUser(fakeid, {}, uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User name is not a string"))
                )
                        
                it("should throw error on empty user name", () => 
                    logic.updateUser(fakeid, "", uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User name is empty or blank"))       
                ) 
            
                it("should throw error on blank user name", () => 
                    logic.updateUser(fakeid, "    ", uSurname, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User name is empty or blank"))
                )
            
                it("should throw error on no user surname", () => 
                    logic.updateUser(fakeid, uName, undefined, uEmail, uPass)
                            .catch(({ message }) => expect(message).toBe("User surname is not a string"))
                )

                it("should throw error on user surname that is not a string", () => 
                    logic.updateUser(fakeid, uName, {}, uEmail, uPass)
                            .catch(({ message }) => expect(message).toBe("User surname is not a string"))
                )
            
                it("should throw error on empty user surname", () => 
                    logic.updateUser(fakeid, uName, "", uEmail, uPass)
                            .catch(({ message }) => expect(message).toBe("User surname is empty or blank"))
                )
            
                it("should throw error on blank user surname", () => 
                    logic.updateUser(fakeid, uName, "    ", uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("User surname is empty or blank"))
                )

                it("should throw error on undefined user email", () => 
                    logic.updateUser(fakeid, uName, uSurname, undefined, uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a string"))
                )

                it("should throw error on user email that is not a string", () => 
                    logic.updateUser(fakeid, uName, uSurname, {}, uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a string"))
                )

                it("should throw error on empty user email", () => 
                    logic.updateUser(fakeid, uName, uSurname, "", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )

                it("should throw error on blank user email", () => 
                    logic.updateUser(fakeid, uName, uSurname, "    ", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
            
                it("should throw error on email without @", () => 
                    logic.updateUser(fakeid, uName, uSurname, "jdmail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
            
                it("should throw error on email without .", () => 
                    logic.updateUser(fakeid, uName, uSurname, "jd@mail", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )

                it("should throw error on email with special characters", () => 
                    logic.updateUser(fakeid, uName, uSurname, "jd@m^/ail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
            
                it("should throw error on user password that is not a string", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, {})
                            .catch(({ message }) => expect(message).toBe("User password is not a string"))
                )

                it("should throw error on empty user password", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, "")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )

                it("should throw error on blank user password", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, "    ")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )

                it("should throw error on user new email that is not a string", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, {}, uPass)
                        .catch(({ message }) => expect(message).toBe("User new email is not a string"))
                )
            
                it("should throw error on blank user new email", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, "    ", uPass)
                        .catch(({ message }) => expect(message).toBe("User new email is empty or blank"))
                )
            
                it("should throw error on new email without @", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, "jdmail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User new email is not a valid email"))
                )
            
                it("should throw error on new email without .", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, "jd@mail", uPass)
                        .catch(({ message }) => expect(message).toBe("User new email is not a valid email"))
                )

                it("should throw error on new email with special characters", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, "jd@m^/ail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User new email is not a valid email"))
                )
            
                it("should throw error on if user new password is not a string password", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, uEmail, {})
                        .catch(({ message }) => expect(message).toBe("User new password is not a string"))
                )

                it("should throw error on blank user new password", () => 
                    logic.updateUser(fakeid, uName, uSurname, uEmail, uPass, uEmail, "    ")
                        .catch(({ message }) => expect(message).toBe("User new password is empty or blank"))      
                )
            })
        })
    
        describe('unregister user (userId, uEmail, uPass)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.unregisterUser(id, uEmail, uPass)
                            .then(res => {
                                expect(res).toBeTruthy()
    
                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeNull()
                            })
                    })
            )
    
            describe("error", () => {
                it("should fail on wrong id number", () =>
                    User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                        .then(() => {
                            return logic.unregisterUser(fakeid, uEmail, uPass)
                                .catch(({ message }) => expect(message).toBe(`no user found with user id ${fakeid}`))
                        })
                )
                it("should throw error on undefined user id", () => 
                    logic.unregisterUser(undefined, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                )

                it("should throw error on user id that is not a string", () => 
                    logic.unregisterUser({}, uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                )

                it("should throw error on empty user id", () => 
                    logic.unregisterUser("", uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                )

                it("should throw error on blank user id", () => 
                    logic.unregisterUser("    ", uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                )

                it("should throw error on wrong length user id", () => 
                    logic.unregisterUser("123", uEmail, uPass)
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                )

                it("should throw error on undefined user email", () => 
                    logic.unregisterUser(fakeid, undefined, uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a string"))
                )

                it("should throw error on user email that is not a string", () => 
                    logic.unregisterUser(fakeid, {}, uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a string"))
                )

                it("should throw error on empty user email", () => 
                    logic.unregisterUser(fakeid, "", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )

                it("should throw error on blank user email", () => 
                    logic.unregisterUser(fakeid, "    ", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is empty or blank"))
                )
            
                it("should throw error on email without @", () => 
                    logic.unregisterUser(fakeid, "jdmail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
            
                it("should throw error on email without .", () => 
                    logic.unregisterUser(fakeid, "jd@mail", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )

                it("should throw error on email with special characters", () => 
                    logic.unregisterUser(fakeid, "jd@m^/ail.com", uPass)
                        .catch(({ message }) => expect(message).toBe("User email is not a valid email"))
                )
            
                it("should throw error on user password that is not a string", () => 
                    logic.unregisterUser(fakeid, uEmail, {})
                            .catch(({ message }) => expect(message).toBe("User password is not a string"))
                )

                it("should throw error on empty user password", () => 
                    logic.unregisterUser(fakeid, uEmail, "")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )

                it("should throw error on blank user password", () => 
                    logic.unregisterUser(fakeid, uEmail, "    ")
                        .catch(({ message }) => expect(message).toBe("User password is empty or blank"))
                )
            })
        })

    })

    describe("notes", () => {

        describe('add note (userId, text)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return logic.addNote(id, uText)
                            .then(noteId => {
    
                                expect(typeof noteId).toBe('string')
                                expect(noteId).toBeDefined()
    
                                return User.findById(id)
                                    .then(user => {
                                        expect(user).toBeDefined()
    
                                        expect(user.notes).toBeDefined()
                                        expect(user.notes.length).toBe(1)
    
                                        const [{ id, text }] = user.notes
    
                                        expect(id).toBe(noteId)
                                        expect(text).toBe(uText)
                                    })
                            })
                    })
            )
    
            it("should succeed on create different notes for different users", () => {
                const promises = randoms.map((v, i) => logic.registerUser(uName, uSurname, `email${i}@mail.com`, uPass))
    
                return Promise.all(promises)
                .then(res => {
                    return User.find({}, null, {sort: {email: 1}})
                })
                .then((users) => {
                    expect(users).toBeTruthy()
                    expect(users.length).toBe(randoms.length)
                    const firstUser = users[0].id
                    const secondUser = users[1].id
                    const thirdUser = users[2].id
                    return logic.addNote(firstUser, "note for user 1")
                        .then(noteId => {
                            expect(typeof noteId).toBe('string')
                            expect(noteId).toBeDefined()
                            const promises = randoms.map((v, i) => logic.addNote(thirdUser, "notes for user 3"))
                            return Promise.all(promises)
                            .then(notesId3 => {
                                expect(typeof notesId3).toBe('object')
                                expect(typeof notesId3[0]).toBe('string')
                                expect(notesId3).toBeDefined() 
                                expect(notesId3.length).toBe(randoms.length) 
                                return User.findById(firstUser)
                                    .then(user => {
                                        expect(user).toBeDefined()
        
                                        expect(user.notes).toBeDefined()
                                        expect(user.notes.length).toBe(1)
                                        expect(user.id).toBe(firstUser)
        
                                        const [{ id, text }] = user.notes
        
                                        expect(id).toBe(noteId)
                                        expect(text).toBe("note for user 1")
                                        return User.findById(thirdUser)
                                        .then(user => {
                                            expect(user).toBeDefined()
            
                                            expect(user.notes).toBeDefined()
                                            expect(user.notes.length).toBe(randoms.length)
                                            expect(user.id).toBe(thirdUser)
    
                                            return User.findById(secondUser)
                                            .then(user => {
                                                expect(user).toBeDefined()
                                                expect(user.id).toBe(secondUser)
                
                                                expect(user.notes).toBeDefined()
                                                expect(user.notes.length).toBe(0)
                                                expect(user.notes._id).toBeUndefined()
                                                expect(user.notes.text).toBeUndefined()
                                            })
                                        })
                                    })
                            })
                        })
                })
            })
            
            describe("errors", () => {
                it('should throw error on no text', () => 
                    logic.addNote('123456781234567812345678')
                        .catch(({ message }) => expect(message).toBe('Note text is not a string'))
                )
        
                it('should throw error on empty text', () =>
                    logic.addNote('123456781234567812345678','')
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
        
                it('should throw error on blank text', () =>
                    logic.addNote('123456781234567812345678','   ')
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
        
                it('should throw error on wrong user id number', () => 
                    logic.addNote('123456781234567812345678', 'my note')
                        .catch(({ message }) => expect(message).toBe(`no user found with id 123456781234567812345678`))
                )
    
                it ("should throw error on wrong user id type", () => {
                    logic.addNote(123456781234567812345678, 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on undefined user id", () => {
                    logic.addNote(undefined, 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty string of user id", () => {
                    logic.addNote("", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error on blank user id", () => {
                    logic.addNote("     ", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error if user id length is not 24", () => {
                    logic.addNote("123", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })
    
            })
        })
    
        describe('retrieve note (userId, noteId)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                        return User.findByIdAndUpdate(id, { $push: { notes: { text: uText } } }, { new: true })
                        .then(user => {
                            if (!user) throw Error(`no user found with id ${id}`)
                            const noteId = user.notes[user.notes.length - 1].id
    
                            return logic.retrieveNote(id, noteId)
                                .then(({id, text}) => {
    
                                    expect(id).toBe(noteId)
                                    expect(text).toBe(uText)
                                })
                        })
                    })
            )
    
            it("should succeed with different notes and users", () => {
                const promises = randoms.map((v, i) => logic.registerUser(uName, uSurname, `email${i}@mail.com`, uPass))
    
                return Promise.all(promises)
                .then(res => {
                    return User.find({}, null, {sort: {email: 1}})
                })    
                .then((users) => {
                    const createdUser = users[0].id
                    const createdUser2 = users[1].id              
                    let promNotes = randoms.map((v, i) =>  
                        User.findByIdAndUpdate(createdUser, { $push: { notes: { text: `${uText} ${i} for 1` } } }, { new: true })
                    )
                    return Promise.all(promNotes)
                    .then(users => {
                        return users[users.length - 1]
                        
                    })   
                    .then(user1 => {
                        if (!user1) throw Error(`no user found with id ${createdUser}`)
                        const noteId1_u1 = user1.notes[1].id
    
                        let promNotes = randoms.map((v, i) =>  
                            User.findByIdAndUpdate(createdUser2, { $push: { notes: { text: `${uText} ${i} for 2` } } }, { new: true })
                        )
                        return Promise.all(promNotes)
                        .then(users => {
                            return users[users.length - 1]
                            
                        }) 
                        .then(user2 => {
                            if (!user2) throw Error(`no user found with id ${createdUser2}`)
                            const noteId0_u2 = user2.notes[0].id
                                return logic.retrieveNote(createdUser, noteId1_u1)
                                    .then(({id, text}) => {
        
                                        expect(id).toBe(noteId1_u1)
                                        expect(text.includes(`${uText}`)).toBeTruthy()
                                        expect(text.includes(`for 1`)).toBeTruthy()
    
                                        return logic.retrieveNote(createdUser2, noteId0_u2)
                                            .then(({id, text}) => {
                
                                                expect(id).toBe(noteId0_u2)
                                                expect(text.includes(`${uText}`)).toBeTruthy()
                                                expect(text.includes(`for 2`)).toBeTruthy()
                                            })
                                    })
                            
                        })
    
    
                    })
                        
                    
                })}
            )
    
            describe("errors", () => {

                it("should throw error on wrong user id number", () => 
                    logic.retrieveNote("123456781234567812345678", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe(`no user found with id 123456781234567812345678`))
                )
    
                it ("should throw error on wrong user id type", () => {
                    logic.retrieveNote(123456781234567812345678, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on undefined user id", () => {
                    logic.retrieveNote(undefined, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty string of user id", () => {
                    logic.retrieveNote("", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error on blank user id", () => {
                    logic.retrieveNote("     ", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error if user id length is not 24", () => {
                    logic.retrieveNote("123", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })
     
                it("should throw error on wrong note id number", () => 
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                .then(({ id }) => {
                    logic.retrieveNote(id, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe(`no note found with 123456781234567812345678 id, in user ${id}`))
                    })
                )
    
                it ("should throw error on wrong note id type", () => {
                    logic.retrieveNote("123456781234567812345678", 123456781234567812345678)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })
    
                it ("should throw error on undefined note id", () => {
                    logic.retrieveNote("123456781234567812345678", undefined)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })
    
                it ("should throw error on empty string of note id", () => {
                    logic.retrieveNote("123456781234567812345678", "")
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })
    
                it ("should throw error on blank note id", () => {
                    logic.retrieveNote("123456781234567812345678", "     ")
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })
    
                it ("should throw error if note id length is not 24", () => {
                    logic.retrieveNote("123456781234567812345678", "123")
                        .catch(({ message }) => expect(message).toBe("noteId has a wrong format"))
                })
            })
        })
    
        describe('list notes (userId)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                            let promNotes = randoms.map((v, i) =>  
                            User.findByIdAndUpdate(id, { $push: { notes: { text: `${uText} ${i} for 1` } } }, { new: true })
                        )
                        return Promise.all(promNotes)
                        .then(users => {
                            return users[users.length - 1]
                        }) 
                        .then(user => {                       
                            expect(user).toBeDefined()
                            return logic.listNotes(id)
                            .then(noteslist => {
                                expect(noteslist).toBeDefined()
                                expect(noteslist.length).toBe(randoms.length)
    
                                noteslist.forEach((note, i) => {
                                    expect(note.id).toBeDefined()
                                    expect(note.text.includes(`${uText}`)).toBeTruthy()
                                    expect(note.text).toBeDefined()
                                });
                            })
                        })
                    })
            )
    
            describe("errors", () => {
                it("should throw error on wrong user id number", () => 
                    logic.listNotes("123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe(`no user found with id 123456781234567812345678`))
                )
    
                it ("should throw error on wrong user id type", () => {
                    logic.listNotes(123456781234567812345678)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on undefined user id", () => {
                    logic.listNotes(undefined)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty user id", () => {
                    logic.listNotes()
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty string of user id", () => {
                    logic.listNotes("")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error on blank user id", () => {
                    logic.listNotes("     ")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error if user id length is not 24", () => {
                    logic.listNotes("123")
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })
            })
        })
    
        describe('remove notes (userId, noteId)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                            let promNotes = randoms.map((v, i) =>  
                            User.findByIdAndUpdate(id, { $push: { notes: { text: `${uText} ${i} for 1` } } }, { new: true })
                        )
                        return Promise.all(promNotes)
                        .then(users => {
                            return users[users.length - 1]
                        }) 
                        .then(user => {                     
                            expect(user).toBeDefined()
                            return logic.removeNote(user.id, user.notes[1].id)
                            .then((res) => {
                                expect(res).toBeTruthy()
                                return User.findById(id)
                            })
                            .then(user => {
                                expect(user).toBeDefined()
                                expect(user.notes.length).toBe(randoms.length - 1)
                            })
                        })
                    })
            )
    
            describe("errors", () => {
                it("should throw error on wrong user id number", () => 
                    logic.removeNote("123456781234567812345678", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe(`no note found with 123456781234567812345678 id, in user 123456781234567812345678`))
                )
    
                it ("should throw error on wrong user id type", () => {
                    logic.removeNote(123456781234567812345678, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on undefined user id", () => {
                    logic.removeNote(undefined, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty string of user id", () => {
                    logic.removeNote("", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error on blank user id", () => {
                    logic.removeNote("     ", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error if user id length is not 24", () => {
                    logic.removeNote("123", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })
     
                it("should throw error on wrong note id number", () => 
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                .then(({ id }) => {
                    logic.removeNote(id, "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe(`no note found with 123456781234567812345678 id, in user ${id}`))
                    })
                )
    
                it ("should throw error on wrong note id type", () => {
                    logic.removeNote("123456781234567812345678", 123456781234567812345678)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })
    
                it ("should throw error on undefined note id", () => {
                    logic.removeNote("123456781234567812345678", undefined)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })
    
                it ("should throw error on empty string of note id", () => {
                    logic.removeNote("123456781234567812345678", "")
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })
    
                it ("should throw error on blank note id", () => {
                    logic.removeNote("123456781234567812345678", "     ")
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })
    
                it ("should throw error if note id length is not 24", () => {
                    logic.removeNote("123456781234567812345678", "123")
                        .catch(({ message }) => expect(message).toBe("noteId has a wrong format"))
                })
            })
        })
    
        describe('update note (userId, noteId, text)', () => {
            it('should succeed on correct data', () =>
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then(({ id }) => {
                            let promNotes = randoms.map((v, i) =>  
                            User.findByIdAndUpdate(id, { $push: { notes: { text: `${uText} ${i} for 1` } } }, { new: true })
                        )
                        return Promise.all(promNotes)
                        .then(users => {
                            return users[users.length - 1]
                        }) 
                        .then(user => {                      
                            expect(user).toBeDefined()
                            return logic.updateNote(user.id, user.notes[1].id, "holacaracola")
                            .then((res) => {
                                expect(res).toBeTruthy()
                                return User.findById(id)
                                .then(resp => {
                                    expect(resp).toBeDefined()
                                    expect(resp.notes.length).toBe(randoms.length)
                                    expect(resp.notes[1].text).toBe("holacaracola")
                                })
                            })
                        })
                    })
            )
            
            describe("errors", () => {
                it("should throw error on wrong user id number", () => 
                    logic.updateNote("123456781234567812345678", "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("no user found with id 123456781234567812345678"))
                )
    
                it ("should throw error on wrong user id type", () => {
                    logic.updateNote(123456781234567812345678, "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on undefined user id", () => {
                    logic.updateNote(undefined, "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })
    
                it ("should throw error on empty string of user id", () => {
                    logic.updateNote("", "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error on blank user id", () => {
                    logic.updateNote("     ", "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })
    
                it ("should throw error if user id length is not 24", () => {
                    logic.updateNote("123", "123456781234567812345678", uText)
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })

                it("should throw error on wrong note id number", () => 
                    User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                        .then(({ id }) => {
                            return logic.updateNote(id, "123456781234567812345678", uText)
                                .catch(({ message }) => expect(message).toBe(`no note found with 123456781234567812345678 id, in user ${id}`))
                                })
                )


                it ("should throw error on wrong note id type", () => {
                    logic.updateNote("123456781234567812345678", 123456781234567812345678, uText)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })

                it ("should throw error on undefined note id", () => {
                    logic.updateNote("123456781234567812345678", undefined, uText)
                        .catch(({ message }) => expect(message).toBe("noteId is not a string"))
                })

                it ("should throw error on empty string of note id", () => {
                    logic.updateNote("123456781234567812345678", "", uText)
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })

                it ("should throw error on blank note id", () => {
                    logic.updateNote("123456781234567812345678", "     ", uText)
                        .catch(({ message }) => expect(message).toBe("noteId is empty or blank"))
                })

                it ("should throw error if note id length is not 24", () => {
                    logic.updateNote("123456781234567812345678", "123", uText)
                        .catch(({ message }) => expect(message).toBe("noteId has a wrong format"))
                })


                it('should throw error on no text', () => 
                    logic.updateNote("123456781234567812345678", "123456781234567812345678")
                        .catch(({ message }) => expect(message).toBe('Note text is not a string'))
                )
        
                it('should throw error on empty text', () =>
                    logic.updateNote("123456781234567812345678", "123456781234567812345678","")
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
        
                it('should throw error on blank text', () =>
                    logic.updateNote("123456781234567812345678", "123456781234567812345678",'   ')
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
            })
        })
    
         describe('find notes by text (userId, text', () => {
            it('should return results on matching text', () => 
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                    .then((user) => {
                        user.notes.push(new Note({ text: `my note 1` }))
                        user.notes.push(new Note({ text: `mi nota 2` }))
                        user.notes.push(new Note({ text: `my noute 3` }))
                        
                        return user.save()
                            .then(({ id, text }) => {
                                return logic.findNotes(id, "not")
                                .then(notes => {
                                    expect(notes).toBeDefined()
                                    expect(notes.length).toBe(2)
                                    notes.forEach(({ id, text }) => {
                                        expect(id).toBeDefined()
                                        expect(text.includes("not")).toBeTruthy()
                                        
                                    })
                                })
                            })
                    })
            )

            it('should return one specific note on matching text with random case', () => 
                User.create({ name: uName, surname: uSurname, email: uEmail, password: uPass })
                .then((user) => {
                    user.notes.push(new Note({ text: `my note 1` }))
                    user.notes.push(new Note({ text: `mi nota 2` }))
                    user.notes.push(new Note({ text: `my noute 3` }))
                    
                    return user.save()
                        .then(({ id }) => {
                            return logic.findNotes(id, "nOUt")
                            .then(notes => {
                                expect(notes).toBeDefined()
                                expect(notes.length).toBe(1)
                                expect(notes[0].id).toBeDefined()
                                expect(notes[0].text).toBe(`my noute 3`)
                            })
                        })
                })
            )

            describe("errors", () => {
                it('should throw error on no text', () => 
                logic.findNotes('123456781234567812345678')
                    .catch(({ message }) => expect(message).toBe('Note text is not a string'))
                )
        
                it('should throw error on empty text', () =>
                    logic.findNotes('123456781234567812345678','')
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
        
                it('should throw error on blank text', () =>
                    logic.findNotes('123456781234567812345678','   ')
                        .catch(({ message }) => expect(message).toBe('Note text is empty or blank'))
                )
        
                it('should throw error on wrong user id number', () => 
                    logic.findNotes('123456781234567812345678', 'my note')
                        .catch(({ message }) => expect(message).toBe(`no user found with id 123456781234567812345678`))
                )

                it ("should throw error on wrong user id type", () => {
                    logic.findNotes(123456781234567812345678, 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })

                it ("should throw error on undefined user id", () => {
                    logic.findNotes(undefined, 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is not a string"))
                })

                it ("should throw error on empty string of user id", () => {
                    logic.findNotes("", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })

                it ("should throw error on blank user id", () => {
                    logic.findNotes("     ", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId is empty or blank"))
                })

                it ("should throw error if user id length is not 24", () => {
                    logic.findNotes("123", 'my note')
                        .catch(({ message }) => expect(message).toBe("userId has a wrong format"))
                })
            })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})