'use strict'

describe('users api', () => {
    const username = 'u', password = 'p'
    let data

    // use session storage for token
    usersApi.token = token => {
        if (token) {
            //sessionStorage.setItem('token', token)
            localStorage.setItem('token', token)

            return
        }

        //return sessionStorage.getItem('token')
        return localStorage.getItem('token')
    }

    beforeEach(done => {
        data = { name: 'John', surname: 'Doe', age: 40 }

        return usersApi.authenticate(username, password)
            .then(id => {
                return usersApi.unregister(id, username, password)
            })
            .then(() => done())
            .catch(() => done())
    })

    describe('register > authenticate > unregister', () => {
        it('should succeed on valid user', () =>
            usersApi.register(username, password, data)
                .then(id => {
                    expect(id).toBeDefined()

                    return usersApi.authenticate(username, password)
                        .then(_id => {
                            expect(_id).toBeDefined()
                            expect(_id).toBe(id)

                            return usersApi.unregister(id, username, password)
                        })
                        .then(res => {
                            expect(res).toBeTruthy()

                            return usersApi.authenticate(username, password)
                        })
                        .catch(err => {
                            expect(err).toBeDefined()
                        })
                })
        )
    })

    describe('register > authenticate > retrieve > unregister', () => {
        it('should succeed on valid user', () =>
            usersApi.register(username, password, data)
                .then(id => {
                    expect(id).toBeDefined()

                    return usersApi.authenticate(username, password)
                        .then(_id => {
                            expect(_id).toBeDefined()
                            expect(_id).toBe(id)

                            return usersApi.retrieve(id)
                        })
                        .then(user => {
                            expect(user).toBeDefined()
                            expect(user.id).toBe(id)
                            expect(user.username).toBe(username)
                            expect(user.name).toBe(data.name)
                            expect(user.surname).toBe(data.surname)
                            expect(user.age).toBe(data.age)

                            return usersApi.unregister(id, username, password)
                        })
                        .then(res => {
                            expect(res).toBeTruthy()

                            return usersApi.authenticate(username, password)
                        })
                        .catch(err => expect(err).toBeDefined())
                })
        )
    })

    describe('register > authenticate > update > retrieve > unregister', () => {
        it('should succeed on valid user', () =>
            usersApi.register(username, password, data)
                .then(id => {
                    expect(id).toBeDefined()

                    return usersApi.authenticate(username, password)
                        .then(_id => {
                            expect(_id).toBeDefined()
                            expect(_id).toBe(id)

                            data.newUsername = 'u2'
                            data.newPassword = 'p2'
                            data.name = 'John'
                            data.surname = 'Wayne'
                            data.age = 50

                            return usersApi.update(id, username, password, data)
                        })
                        .then(res => {
                            expect(res).toBeTruthy()

                            return usersApi.retrieve(id)
                        })
                        .then(user => {
                            expect(user).toBeDefined()
                            expect(user.id).toBe(id)
                            expect(user.username).toBe(data.newUsername)
                            expect(user.name).toBe(data.name)
                            expect(user.surname).toBe(data.surname)
                            expect(user.age).toBe(data.age)

                            return usersApi.unregister(id, user.username, data.newPassword)
                        })
                        .then(res => {
                            expect(res).toBeTruthy()

                            return usersApi.authenticate(username, password)
                        })
                        .catch(err => expect(err).toBeDefined())
                })
        )
    })
})