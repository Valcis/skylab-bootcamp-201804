'use strict'

class Hangman {

    constructor(word, att){

        if(typeof word !== 'string') throw Error('invalid input word')

        const _lose = 1;
        const _continue = 3;
        const _win = 2;
        this._wordGuessed = [];
        this._wordToGuess = word;
        this._attempts = att || 10;
        this._status = Hangman.CONTINUE;

        for (var i = 0; i<word.length; i++)  this._wordGuessed.push('_')

    }

    try(char){

        if(typeof char !== 'string') throw Error('invalid input letter or word')

        if(!this._wordToGuess.includes(char)) {
            this._attempts--

            if(this._attempts === 0) this._status = Hangman.LOSE

            return false;
        }

        for(let i = 0; i < this._wordToGuess.length; i++){
            if (char === this._wordToGuess[i]){
                this._wordGuessed[i] = this._wordToGuess[i];
            } 
        }

        if(this._wordGuessed.join('') === this._wordToGuess) this._status = Hangman.WIN

        return true;
    }

    guessed(){
        return this._wordGuessed;
    }

    attempts(){
        return this._attempts;
    }

    status(){
        return this._status;
    }

    static get LOSE() {
        return this._lose;
    }

    static get WIN() {
        return this._win;
    }

    static get CONTINUE(){
        return this._continue;
    }

}