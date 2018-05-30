'use strict'

describe('logic (github)', () => {
    logic.token = '316f8c330c989ac16e9c3a0a6fa1a2b8c3c18935'

    it('should "tom" search get results', done => {
        logic.searchUsers('tom', (err, users) => {
            expect(err).toBeUndefined()

            expect(users).toBeDefined()
            expect(users instanceof Array).toBeTruthy()
            expect(users.length).toBe(30)

            done()
        })
    })

    it('should "no-results-please" search get no results', done => {
        logic.searchUsers('no-results-please', (err, users) => {
            expect(err).toBeUndefined()

            expect(users).toBeDefined()
            expect(users instanceof Array).toBeTruthy()
            expect(users.length).toBe(0)

            done()
        })
    })

    it('should "tom" retrieval get info', done => {
        logic.retrieveUser('tom', (err, user) => {
            expect(err).toBeUndefined()
            
            expect(user).toBeDefined()
            expect(user.login).toBe('tom')

            done()
        })
    })

    it('should "no-info-please" retrieval get no info', done => {
        logic.retrieveUser('no-info-please', (err, user) => {
            expect(err).toBeUndefined()
            
            expect(user).toBeUndefined()

            done()
        })
    })
})