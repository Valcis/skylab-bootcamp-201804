'use strict'

describe('Cocktail', () => {

    it('should return a cocktail data', done => {
        
        logic2.randomCocktail()
            .then(data => {
                console.log(data)
                expect(data).toBeDefined()
                expect(data instanceof Object).toBeTruthy()
                expect(Object.keys(data).length).toBe(1)
                // expect(data.title).toEqual('London')
                // logic2.id = data.data.id; 
                done()
            })
            .catch(done)
    })
})