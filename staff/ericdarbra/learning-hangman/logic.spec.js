'use strict'

describe('logic(hangman)', function(){

    let hangman

    beforeEach(function(){

        hangman = new Hangman('hola')
    })

    it('should hangman', function(){

        expect(hangman.try('a')).toBeTruthy()
        expect(hangman.try('x')).toBeFalsy()
    
    })

    it('should hangman throw an error', function(){
        expect(function(){
            hangman.try()
        }).toThrow(Error('Invalid word'))
    })



})
