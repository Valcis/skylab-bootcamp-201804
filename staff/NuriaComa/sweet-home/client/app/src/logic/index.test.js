'use strict'

const { expect } = require('chai')
const logic = require('.')
const shApi = require('api')

describe('logic (sweet-home)', () => {
    const userData = { name: 'Nur', surname: 'C', phone: '689456739', dni: '45629856L', password: '1234', apartmentId: '5b213682489be107808607bc' }
    const apartData = { name: 'casa', address: 'c', phone: '23445' }

    beforeEach(done => {
        const { dni, password } = userData
        shApi.authenticateUser(dni, password)
        .then(res => {

                shApi.unregisterUser(res.id)
                
                .then(res => {

                    
                    done()
                })
            })
            .catch(err => {
                done()
            })
    })

    describe('register user', () => {
        it('should succeed on correct data', () => {
            
            return logic.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                .then(res => {
                    expect(res).to.be.true

                })
            
        })
    })

//     describe('login', () => {
//         it('should succeed on correct data', () => {
            
          
//             return shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                
//                 .then(() => logic.authenticateUser('45629856L', '1234'))
//                 .then(res => {
//                     expect(res).to.exist

//                     expect(res.userId).not.to.equal('NO-ID')
//                 })
        
//     })
// })
    describe('retrieve', () => {
        it('shoul succeed on correct data', () => {
            
           
            return shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                .then(() => logic.authenticateUser(dni, password))
                .then(() => {
                    logic.retrieveUser(logic.userId)
                        .then(res => {
                            expect(res).to.be.true
                       
                            expect(logic.data).not.to.equal('NO-DATA')
                            
                        })
                })

        
    })
}) 
    describe('update', () => {
        it('should succeed on correct data', () => {
           
            return shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                .then(() => logic.authenticateUser(dni, password))
                .then(() => {
                   
                    const newPassword = '789'

                    return logic.updateUser(logic.userId, name, surname, phone, dni, password, newPassword)
                        .then(res => {
                            expect(res).to.be.true
                            return shApi.unregisterUser(logic.userId, dni, '789')
                        })
                
        })

    })
})
    describe('list users', () => {
        it('shoul succeed on correct data', () => {
          
            return shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                .then(() => logic.authenticateUser(dni, password))

                .then(() => {
                    logic.listUsers()
                        .then(data => {
                        
                            expect(data).not.to.equal('NO-DATA')
                            
                        })
                

        })
    })
})
    describe('unregister', () => {
        it('should succeed on correct data', () => {
           
            return shApi.registerUser('Nur', 'C', '689456739', '45629856L', '1234', '5b213682489be107808607bc')
                .then(() => logic.authenticateUser(dni, password))
                .then(() => {
                    logic.unregisterUser(logic.userId)
                        .then(res => {
                            expect(res).to.be.true

                        })
                })
        

    })
})

})
