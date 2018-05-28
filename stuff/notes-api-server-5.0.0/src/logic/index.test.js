'use strict'

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const { User, Note } = require('../models')

describe('logic (notes)', () => {
    before(() => mongoose.connect('mongodb://localhost/skylab-bootcamp-201804-test'))

    beforeEach(() => Promise.all([User.remove(), Note.deleteMany()]))

    describe('register', () => {
        it('should succeed on correct dada', () =>
            logic.register('John', 'Doe', 'jd@mail.com', '123')
                .then(res => expect(res).toBeTruthy())
        )

        // TODO error cases
    })

    describe('login', () => {
        it('should succeed on correct data', () =>
            User.create({ name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' })
                .then(() =>
                    logic.login('jd@mail.com', '123')
                        .then(id => expect(id).toBeDefined())
                )
        )

        // TODO error cases
    })

    describe('retrieve', () => {
        it('should succeed on correct data', () => {
            // TODO create user with User model
            // TODO logic.retrieve(id)
        })

        // TODO error cases
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})

