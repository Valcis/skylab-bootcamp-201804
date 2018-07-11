'use strict'

require('dotenv').config()

const { mongoose, models: { User, Apartment } } = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('models (sweet-home)', () => {
    const jackData = { name: 'Jack', surname: 'Johnson', phone: '+34 933 666 777', dni: '01234567Z', password: '123' }
    const annaData = { name: 'Anna', surname: 'Kennedy', phone: '+34 933 666 778', dni: '01234568U', password: '456' }
    const apartmentData = { name: 'Skylab', address: 'Roc Boronat 35', phone: '+34 933 111 222', owner: [{ name: 'John', surname: 'Doe', dni: '12345678T', phone: '+34 933 333 444' }], realstate: { name: 'Super Pisos', address: 'Llull 40', phone: '+34 933 222 555' } }

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all([User.remove(), Apartment.deleteMany()]))

    describe('create user', () => {
        it('should succeed on correct data', () => {
            const user = new User(jackData)

            return user.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist
                    expect(user.name).to.equal(jackData.name)
                    expect(user.surname).to.equal(jackData.surname)
                    expect(user.phone).to.equal(jackData.phone)
                    expect(user.dni).to.equal(jackData.dni)
                    expect(user.password).to.equal(jackData.password)
                })
        })
    })

    describe('create apartment', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                User.create(jackData),
                User.create(annaData)
            ])
                .then(res => {
                    const [{ _doc: user1 }, { _doc: user2 }] = res

                    expect(user1).to.exist
                    expect(user1.name).to.equal(jackData.name)

                    expect(user2).to.exist
                    expect(user2.name).to.equal(annaData.name)

                    const apartment = new Apartment(apartmentData)

                    apartment.users.push(user1._id)
                    apartment.users.push(user2._id)

                    return apartment.save()
                        .then(apartment => {
                            expect(apartment._id).to.exist
                            expect(apartment.name).to.equal(apartmentData.name)
                            //...

                            const { users: [userId1, userId2] } = apartment

                            expect(userId1.toString()).to.equal(user1._id.toString())
                            expect(userId2.toString()).to.equal(user2._id.toString())
                        })
                })
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})