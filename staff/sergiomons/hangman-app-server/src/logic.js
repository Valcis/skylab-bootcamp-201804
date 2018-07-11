'use strict';

const Hangman = (function () {
    class Hangman {
        constructor(word, attempts = 10) {
            if (typeof word !== 'string') throw Error('invalid word ' + word)

            this._word = word.trim().toUpperCase()

            if (!this._word.length) throw Error('word cannot empty or blank')

            this._attempts = attempts

            if (typeof this._attempts !== 'number') throw Error('invalid attempts ' + this._attempts)

            if (this._attempts <= 0) throw Error('invalid number of attempts ' + this._attempts)

            this._guessed = new Array(this._word.length).fill('_')

            this._matchLetter = false

            this._initGame = false

            this._status = Hangman.CONTINUE
        }

        guessed() {
            return this._guessed
        }

        attempts() {
            return this._attempts
        }

        status() {
            return this._status
        }

        try(text) {
            if (typeof text !== 'string') throw Error('invalid letter or word ' + text)

            this._initGame = true

            text = text.trim().toUpperCase();

            if (!text.length) throw Error('text cannot empty or blank');

            if (this._status === Hangman.CONTINUE && this._attempts > 0)
                return text.length === 1 ? tryLetter(this, text) : tryWord(this, text)

            return false;
        }

        static get CONTINUE() { return 0 }

        static get WIN() { return 1 }

        static get LOSE() { return 2 }
    }

    // Hangman.CONTINUE = 0;
    // Hangman.WIN = 1;
    // Hangman.LOSE = 2;

    function tryLetter(inst, letter) {

        const index = inst._word.indexOf(letter)

        if (index > -1) {
            for (let i = index; i < inst._word.length; i++) {
                const char = inst._word[i]

                if (char === letter) inst._guessed[i] = char
            }

            inst._matchLetter = true

        } else { 
            inst._attempts--
            inst._matchLetter = false
        }
        update(inst)
        return inst._matchLetter
    }

    function tryWord(inst, word) {
        
        if (word === inst._word) {
            for (var i = 0; i < inst._word.length; i++)
                inst._guessed[i] = inst._word[i]

            inst._matchLetter = true
        } else { 
            inst._attempts = 0
            inst._matchLetter = false
        }
        update(inst)
        return inst._matchLetter
    }

    function update(inst) {
        if (!inst._attempts) {
            inst._status = Hangman.LOSE
            inst._initGame = false
        } else if (inst._guessed.indexOf('_') === -1) {
            inst._status = Hangman.WIN
            inst._initGame = false
        } else {
            inst._status = Hangman.CONTINUE
        }
    }

    return Hangman
})()

module.exports = Hangman;

