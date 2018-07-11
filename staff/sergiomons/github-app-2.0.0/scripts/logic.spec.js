'use strict'

describe('logic (github)', () => {
    logic.token = 'a4fdf83ba39d192feefb34d8c6aac9d3b6cd4c61'

    it('should "tom" search get results', done => {
        logic.searchUsers('tom')
            .then(users => {
                expect(users).toBeDefined()
                expect(users instanceof Array).toBeTruthy()
                expect(users.length).toBe(30)

                done()
            })
            .catch(err => expect(err).toBeUndefined())
    })

    it('should "tom" retrieval get info', done => {
        logic.retrieveUser('tom')
            .then(user => {
                expect(user).toBeDefined()
                expect(user.login).toBe('tom')

                done()
            })
            .catch(err => expect(err).toBeUndefined())
    })
})