'use strict'

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const { User, Note } = require('../models')

describe('logic (notes)', () => {
    before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))

    beforeEach(() => Promise.all([User.remove()/*, Note.deleteMany()*/]))

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            logic.registerUser('John', 'Doe', 'jd@mail.com', '123')
                .then(res => expect(res).toBeTruthy())
        )
        it('should throw error on existing email', ()=>{
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(() =>{
                logic.registerUser('Jack', 'Does', 'jd@mail.com', '123')
                .catch(({message})=> expect(message).toBe('existing email'))
            })
        })
        
        it('should throw error on non correct name', () => {
           logic.registerUser(undefined, 'Doe', 'jd@mail.com', '123')
           .catch(({message})=> expect(message).toBe('name is not a string'))
        })
        it('should throw error on non correct name', () => {
            logic.registerUser('', 'Doe', 'jd@mail.com', '123')
            .catch(({message})=> expect(message).toBe('name is empty or blank'))
         })
         it('should throw error on non correct surname', () => {
            logic.registerUser('John', undefined, 'jd@mail.com', '123')
            .catch(({message})=> expect(message).toBe('surname is not a string'))
         })
         it('should throw error on non correct surname', () => {
             logic.registerUser('John', '', 'jd@mail.com', '123')
             .catch(({message})=> expect(message).toBe('surname is empty or blank'))
          })
          it('should throw error on non correct email', () => {
            logic.registerUser('John','Doe', undefined, '123')
            .catch(({message})=> expect(message).toBe('email is not a string'))
         })
         it('should throw error on non correct email', () => {
             logic.registerUser('John','Doe', '', '123')
             .catch(({message})=> expect(message).toBe('email is empty or blank'))
          })
          it('should throw error on non correct password', () => {
            logic.registerUser('John','Doe','jd@mail.com', undefined)
            .catch(({message})=> expect(message).toBe('password is not a string'))
         })
         it('should throw error on non correct password', () => {
             logic.registerUser('John','Doe', 'jd@mail.com','')
             .catch(({message})=> expect(message).toBe('password is empty or blank'))
          })
       
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(() =>
                    logic.authenticateUser('jd@mail.com', '123')
                        .then(id => expect(id).toBeDefined())
                )
        )

        it('should throw error on non correct email', () => {
            logic.authenticateUser( undefined, '123')
            .catch(({message})=> expect(message).toBe('email is not a string'))
         })
         it('should throw error on non correct email', () => {
             logic.authenticateUser( '', '123')
             .catch(({message})=> expect(message).toBe('email is empty or blank'))
          })
          it('should throw error on non correct password', () => {
            logic.authenticateUser('jd@mail.com', undefined)
            .catch(({message})=> expect(message).toBe('password is not a string'))
         })
         it('should throw error on non correct password', () => {
             logic.authenticateUser( 'jd@mail.com','')
             .catch(({message})=> expect(message).toBe('password is empty or blank'))
          })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.retrieveUser(id)
                })
                .then(user => {
                    expect(user).toBeDefined()

                    const { id, name, surname, email, _id, password, notes } = user

                    expect(id).toBeDefined()
                    expect(name).toBe('John')
                    expect(surname).toBe('Doe')
                    expect(email).toBe('jd@mail.com')

                    expect(_id).toBeUndefined()
                    expect(password).toBeUndefined()
                    expect(notes).toBeUndefined()
                })
        )

        it('should throw error on non correct id', () => {
            logic.retrieveUser()
            .catch(({message})=> expect(message).toBe('id is not a string'))
         })
         it('should throw error on non correct id', () => {
             logic.retrieveUser('')
             .catch(({message})=> expect(message).toBe('id is empty or blank'))
          })
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
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

        it('should throw error on existing email', () =>

        User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
        .then(()=>{
            return User.create({ name: 'Jack', surname: 'Wyne', email: 'jw@mail.com', password: '456' })
                .then(({ id }) => {
                    return logic.updateUser(id, 'Jack', 'Wayne', 'jw@mail.com', '456', 'jd@mail.com', '456')
                    .catch(({message})=> expect(message).toBe('existing email'))
                    })

        })
            
        )

        it('should throw error on non correct id', () => {
            logic.updateUser(undefined, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
            .catch(({message})=> expect(message).toBe('id is not a string'))
         })
         it('should throw error on non correct id', () => {
             logic.updateUser('', 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
             .catch(({message})=> expect(message).toBe('id is empty or blank'))
          })
         it('should throw error on non correct name', () => {
           logic.updateUser('123456781234567812345678', undefined, 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
           .catch(({message})=> expect(message).toBe('name is not a string'))
        })
        it('should throw error on non correct name', () => {
            logic.updateUser('123456781234567812345678', '', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
            .catch(({message})=> expect(message).toBe('name is empty or blank'))
         })
         it('should throw error on non correct surname', () => {
            logic.updateUser('123456781234567812345678', 'Jack', undefined, 'jd@mail.com', '123', 'jw@mail.com', '456')
            .catch(({message})=> expect(message).toBe('surname is not a string'))
         })
         it('should throw error on non correct surname', () => {
             logic.updateUser('123456781234567812345678', 'Jack', '', 'jd@mail.com', '123', 'jw@mail.com', '456')
             .catch(({message})=> expect(message).toBe('surname is empty or blank'))
          })
          it('should throw error on non correct email', () => {
            logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', undefined, '123', 'jw@mail.com', '456')
            .catch(({message})=> expect(message).toBe('email is not a string'))
         })
         it('should throw error on non correct email', () => {
             logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', '', '123', 'jw@mail.com', '456')
             .catch(({message})=> expect(message).toBe('email is empty or blank'))
          })
          it('should throw error on non correct password', () => {
            logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', undefined, 'jw@mail.com', '456')
            .catch(({message})=> expect(message).toBe('password is not a string'))
         })
         it('should throw error on non correct password', () => {
             logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', '', 'jw@mail.com', '456')
             .catch(({message})=> expect(message).toBe('password is empty or blank'))
          })
          it('should throw error on non correct newEmail', () => {
            logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', '123', undefined, '456')
            .catch(({message})=> expect(message).toBe('newEmail is not a string'))
         })
         it('should throw error on non correct newEmail', () => {
             logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', '123', '', '456')
             .catch(({message})=> expect(message).toBe('newEmail is empty or blank'))
          })
          it('should throw error on non correct newPassword', () => {
            logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', undefined)
            .catch(({message})=> expect(message).toBe('newPassword is not a string'))
         })
         it('should throw error on non correct newPassword', () => {
             logic.updateUser('123456781234567812345678', 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '')
             .catch(({message})=> expect(message).toBe('newPassword is empty or blank'))
          })
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(({ id }) => {
                    return logic.unregisterUser(id, 'jd@mail.com', '123')
                        .then(res => {
                            expect(res).toBeTruthy()

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).toBeNull()
                        })
                })
        )

        it('should throw error on non correct id', () => {
            logic.unregisterUser(undefined,'jd@mail.com', '123')
            .catch(({message})=> expect(message).toBe('id is not a string'))
         })
         it('should throw error on non correct id', () => {
             logic.unregisterUser('','jd@mail.com', '123')
             .catch(({message})=> expect(message).toBe('id is empty or blank'))
          })
          it('should throw error on non correct email', () => {
            logic.unregisterUser('123456781234567812345678',undefined, '123')
            .catch(({message})=> expect(message).toBe('email is not a string'))
         })
         it('should throw error on non correct email', () => {
             logic.unregisterUser('123456781234567812345678','', '123')
             .catch(({message})=> expect(message).toBe('email is empty or blank'))
          })
          it('should throw error on non correct password', () => {
            logic.unregisterUser('123456781234567812345678','jd@mail.com', undefined)
            .catch(({message})=> expect(message).toBe('password is not a string'))
         })
         it('should throw error on non correct password', () => {
             logic.unregisterUser('123456781234567812345678','jd@mail.com', '')
             .catch(({message})=> expect(message).toBe('password is empty or blank'))
          })
          it('should throw error on wrong credentials', () => {
            
            logic.unregisterUser('123456781234567812345678','jds@mail.com', 'undefined')
            .catch(({message})=> expect(message).toBe('wrong credentials'))
         })
         it('should throw error on non correct user', () => {
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
            .then(() => {
                return logic.unregisterUser('abc', 'jd@mail.com', '123')
             
             .catch(({message})=> expect(message).toBe(`no user found with id abc for given credentials`))
          })
        })  
    })

    describe('add note', ()=>{

        it('should succed on correct data', ()=>
            User.create ({name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123'})
            .then(({ id }) => {
                return logic.addNote(id, 'my note')
                .then (noteId =>{
                    expect (noteId).toBeDefined()
                    User.findById(id)
                    .then(user => {
                        expect (user).toBeDefined()
                        expect (user.notes.length).toBe(1)

                        const [{id, text}]=user.notes

                        expect (id).toBe(noteId)
                        expect(text).toBe('my note')
                    })
                })
            })
        )
        it('should throw an error on non correct userId',() =>{

            logic.addNote(undefined, 'text')
            .catch(({message})=> expect(message).toBe('userId is not a string'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.addNote('', 'text')
            .catch(({message})=> expect(message).toBe('userId is empty or blank'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.addNote('userId')
            .catch(({message})=> expect(message).toBe('text is not a string'))
        })

        it('should throw an error on non correct text',() =>{

            logic.addNote('userId', '')
            .catch(({message})=> expect(message).toBe('text is empty or blank'))
        })

        it('should throw error on wrong user id', () => {
            const userId = '123456781234567812345678'

            return logic.addNote(userId, 'my note')
                .catch(({ message }) => expect(message).toBe(`no user found with id ${userId}`))
        })
    })

    describe('retrieve note', ()=>{

        it('should succes on correct data', ()=>{
           const user= new User ({name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123'})
           const note= new Note ({text:'My note'})

            user.notes.push(note)
            return user.save()
            .then((user)=>{

                return logic.retrieveNote(user.id, user.notes[0].id)
            })
            .then(res=>{
                expect(res.id).toBeDefined()
                expect (res.text).toBeDefined()

                expect (res.id).toBe(user.notes[0].id)
                expect (res.text).toBe('My note')
            })
           
        })
       
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote(undefined, 'id')
            .catch(({message})=> expect(message).toBe('userId is not a string'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote('', 'id')
            .catch(({message})=> expect(message).toBe('userId is empty or blank'))
        }) 
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId')
            .catch(({message})=> expect(message).toBe('id is not a string'))
        })
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId', '')
            .catch(({message})=> expect(message).toBe('id is empty or blank'))
        }) 
        it('should throw an error on non existing id',() =>{
            const user= new User ({name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123'})
            return user.save()
            .then(user =>{

                logic.retrieveNote(user.id,'abc')
                .catch(({message})=> expect(message).toBe(`note with id abc does not exist for userId ${user.id}`))
            })
                
        })
    })

    describe('list note', ()=>{

        it('should succes on correct data', ()=>{
            const user= new User ({name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123'})
            const note= new Note ({text:'My note'})
 
             user.notes.push(note)
             return user.save()
             .then((user)=>{
 
                 return logic.listNotes(user.id)
             })
             .then(res=>{
                 expect(res[0].id).toBeDefined()
                 expect (res[0].text).toBeDefined()
 
                 expect (res[0].id).toBe(user.notes[0].id)
                 expect (res[0].text).toBe('My note')
             })

        })

        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote(undefined, 'id')
            .catch(({message})=> expect(message).toBe('userId is not a string'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote('', 'id')
            .catch(({message})=> expect(message).toBe('userId is empty or blank'))
        }) 
    })
    describe('remove note', ()=>{
        it('should succes on correct data', ()=>{

            let user= new User ({name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123'})
            const note= new Note ({text:'My note'})
            const note2= new Note ({text:'My note2'})
            const note3= new Note ({text:'My note3'})

            user.notes.push(note)
            user.notes.push(note2)
            user.notes.push(note3)
            return user.save()

            .then((user)=>{
                expect(user.notes.length).toBe(3)
                return logic.removeNote(user.id, note2.id)
                        .then((res)=>{
                            expect(res).toBeTruthy()

                            return User.findById(user.id)
                            expect(res.notes[1].id===note3.id).toBeTruthy()
                            expect(res.notes.length).toBe(2)
                            
                            })
       
            })
        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote(undefined, 'id')
            .catch(({message})=> expect(message).toBe('userId is not a string'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote('', 'id')
            .catch(({message})=> expect(message).toBe('userId is empty or blank'))
        }) 
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId')
            .catch(({message})=> expect(message).toBe('id is not a string'))
        })
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId', '')
            .catch(({message})=> expect(message).toBe('id is empty or blank'))
        }) 
    })

    describe('update note', ()=>{

        it('should succes on correct data', ()=>{

        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote(undefined, 'id')
            .catch(({message})=> expect(message).toBe('userId is not a string'))
        })
        it('should throw an error on non correct userId',() =>{

            logic.retrieveNote('', 'id')
            .catch(({message})=> expect(message).toBe('userId is empty or blank'))
        }) 
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId')
            .catch(({message})=> expect(message).toBe('id is not a string'))
        })
        it('should throw an error on non correct id',() =>{

            logic.retrieveNote('userId', '')
            .catch(({message})=> expect(message).toBe('id is empty or blank'))
        }) 

    })
    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
