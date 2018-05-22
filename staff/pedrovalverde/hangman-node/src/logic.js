'use strict'

const Hangman = (function () {
    class Hangman {
        constructor(word, att) {
            if (typeof word !== 'string') throw Error('invalid input word222')
            this._wordGuessed = [];
            this._wordToGuess = word;
            this._attempts = att || 5;
            this._status = Hangman.CONTINUE;

            for (var i = 0; i < word.length; i++)  this._wordGuessed.push('_')
        }

        try(char) {

            if (typeof char !== 'string') throw Error('invalid input letter or word')

            if (!this._wordToGuess.includes(char)) {
                this._attempts--

                if (this._attempts === 0) this._status = Hangman.LOSE

                return false;
            }

            for (let i = 0; i < this._wordToGuess.length; i++) {
                if (char === this._wordToGuess[i]) {
                    this._wordGuessed[i] = this._wordToGuess[i];
                }
            }

            if (this._wordGuessed.join('') === this._wordToGuess) this._status = Hangman.WIN

            return true;
        }

        guessed() {
            return this._wordGuessed;
        }

        attempts() {
            return this._attempts;
        }

        status() {
            return this._status;
        }

        static get CONTINUE() { return 0 }

        static get WIN() { return 1 }

        static get LOSE() { return 2 }
    }

    function tryLetter(inst, letter) {
        const index = inst._word.indexOf(letter)

        let match = false

        if (index > -1) {
            for (let i = index; i < inst._word.length; i++) {
                const char = inst._word[i]

                if (char === letter) inst._guessed[i] = char
            }

            match = true
        } else inst._attempts--

        update(inst)

        return match
    }

    function tryWord(inst, word) {
        let match = false

        if (word === inst._word) {
            for (var i = 0; i < inst._word.length; i++)
                inst._guessed[i] = inst._word[i]

            match = true
        } else inst._attempts = 0

        update(inst)

        return match
    }

    function update(inst) {
        if (!inst._attempts)
            inst._status = Hangman.LOSE
        else if (inst._guessed.indexOf('_') === -1)
            inst._status = Hangman.WIN
        else
            inst._status = Hangman.CONTINUE
    }

    return Hangman
})()

module.exports = Hangman