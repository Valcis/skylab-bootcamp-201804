'use strict'

// TODO

class Hangman {

    constructor(word, attempts = 10) {

        this._word = word;

        if (typeof word !== 'string') throw Error('invalid word ' + word)

        this._attempts = attempts;

        this._status = Hangman.CONTINUE;

        this._wordEmptyArr = [];
        for (let i = 0; i < word.length; i++) { this._wordEmptyArr.push('_') };

    }

    try(letterOrWord) {

        if (typeof letterOrWord !== 'string') throw Error('invalid letter or word ' + letterOrWord)

        if (letterOrWord.length === 1) {
            return tryLetter(this, letterOrWord)
        } else if (letterOrWord.length > 1) {
            return tryWord(this, letterOrWord)
        } else {
            throw Error('invalid letter or word ' + letterOrWord)
        }

        guessed();
        status();
    }
    guessed() {
        return this._wordEmptyArr;
    }
    attempts() {
        return this._attempts;
    }
    status() {
        return this._status;
    }

}

function tryLetter(_this, letter) {
    var wordArr = _this._word.split(""); // ['h', 'e'...]

    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i] === letter) {
            _this._wordEmptyArr[i] = letter;
        }
    }

    if (_this._word.indexOf(letter) > -1) {
        if (wordArr[wordArr.length - 1] === letter){
            _this._status = 2;             
        }
         return true
    } else {
        _this._attempts--;
        if (_this._attempts === 0) { _this._status = 0 }
        return false

    }
}

function tryWord(_this, word) {
    if (_this._word === word) {
        _this._status = 2;
        for (let i = 0; i < word.length; i++) {
            const element = word[i]
            _this._wordEmptyArr[i] = element;
        }
        return _this._wordEmptyArr;
    } else {
        _this._status = 0;
        _this._attempts = 0;
    }
}

Hangman.CONTINUE = 1;
Hangman.WIN = 2;
Hangman.LOSE = 0;


let hangman = new Hangman('hello');

(hangman.try('h'))



