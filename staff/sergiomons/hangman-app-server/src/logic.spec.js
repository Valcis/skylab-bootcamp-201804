'use strict'

describe('logic (hangman)', function () {
    let wordToGuess = 'hello'
    let hangman

    beforeEach(function() {
        hangman = new Hangman(wordToGuess)
    })

    it('should hangman statusses be defined', function() {
        expect(Hangman.CONTINUE).toBeDefined()
        expect(Hangman.WIN).toBeDefined()
        expect(Hangman.LOSE).toBeDefined()
    })

    it('should "guessing the whole word at once" win', function() {
        expect(hangman.try('hello')).toBeTruthy()
        expect(hangman.guessed()).toEqual(['H', 'E', 'L', 'L', 'O'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.WIN)
    })

    it('should "guessing the whole word at once - after a few tries" win', function() {
        expect(hangman.try('h')).toBeTruthy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.attempts()).toBe(10)

        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('x')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(9)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('y')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(8)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('z')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(7)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)
        
        expect(hangman.try('hello')).toBeTruthy()
        expect(hangman.guessed()).toEqual(['H', 'E', 'L', 'L', 'O'])
        expect(hangman.attempts()).toBe(7)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.WIN)
    })

    it('should "trying to guess the whole word at once fail" lose', function() {
        expect(hangman.try('wrong')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(0)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.LOSE)
    })

    it('should "trying to guess the whole word at once - after a few tries - fail" lose', function() {
        expect(hangman.try('h')).toBeTruthy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('x')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(9)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('y')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(8)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('z')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(7)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        expect(hangman.try('wrong')).toBeFalsy()
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(0)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.LOSE)
    })

    it('should "entering an invalid word to be guessed (when initiating the game)" throw error', function() {
        let input
        
        expect(function() {
            new Hangman(input)
        }).toThrow(Error('invalid word ' + input))
    })

    it('should "entering and invalid lettor or word (when guessing)" throw error', function() {
        let input

        expect(function() {
            hangman.try(input)
        }).toThrow(Error('invalid letter or word ' + input))
    })

    it('should "entering and invalid number of attempts" throw error', function() {
        let attempts = -2

        expect(function() {
            new Hangman('hello', attempts)
        }).toThrow(Error('invalid number of attempts ' + attempts))
    })

    it('should "entering and invalid attempts" throw error', function() {
        let attempts = 'attemps'

        expect(function() {
            new Hangman('hello', attempts)
        }).toThrow(Error('invalid attempts ' + attempts))
    })


    it('should "try a letter and match" return true', function () {
        expect(hangman.try('h')).toBeTruthy();
        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)
    })

    it('should "try a letter and not matching" return false', function () {
        expect(hangman.try('x')).toBeFalsy();
        expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(9)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)
    })

    it('should "guess all" win', function () {
        hangman.try('h')

        expect(hangman.guessed()).toEqual(['H', '_', '_', '_', '_'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        hangman.try('e')

        expect(hangman.guessed()).toEqual(['H', 'E', '_', '_', '_'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        hangman.try('l')

        expect(hangman.guessed()).toEqual(['H', 'E', 'L', 'L', '_'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeTruthy()
        expect(hangman.status()).toBe(Hangman.CONTINUE)

        hangman.try('o')

        expect(hangman.guessed()).toEqual(['H', 'E', 'L', 'L', 'O'])
        expect(hangman.attempts()).toBe(10)
        expect(hangman._matchLetter).toBeTruthy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.WIN)
    })

    it('should "waste all attempts" lose', function () {
        let count = hangman.attempts()
        
        while(--count) {
            hangman.try('x')

            expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])
            expect(hangman.attempts()).toBe(count)
            expect(hangman._matchLetter).toBeFalsy()
            expect(hangman._initGame).toBeTruthy()
            expect(hangman.status()).toBe(Hangman.CONTINUE)
        }

        hangman.try('x')

        expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])    
        expect(hangman.attempts()).toBe(0)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.LOSE)
    })

    it('should "waste all attempts given" lose', function () {
        hangman = new Hangman(wordToGuess, 5)

        let count = hangman.attempts()
        
        while(--count) {
            hangman.try('x')
            
            expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])
            expect(hangman.attempts()).toBe(count)
            expect(hangman._matchLetter).toBeFalsy()
            expect(hangman._initGame).toBeTruthy()
            expect(hangman.status()).toBe(Hangman.CONTINUE)
        }

        hangman.try('x')

        expect(hangman.guessed()).toEqual(['_', '_', '_', '_', '_'])    
        expect(hangman.attempts()).toBe(0)
        expect(hangman._matchLetter).toBeFalsy()
        expect(hangman._initGame).toBeFalsy()
        expect(hangman.status()).toBe(Hangman.LOSE)
    })
})