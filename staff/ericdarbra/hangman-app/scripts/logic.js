'use strict'

// TODO

let emptyWord = []
let wordToGuess
let attem
let estado


class Hangman {
    constructor(word, att = 10) {
        
        wordToGuess = word

        if(typeof word !== 'string') throw Error('invalid input word')

        emptyWord = []

        for(var i=0; i < word.length; i++){
            emptyWord.push('_')
        }
        
        attem = att
        estado = Hangman.CONTINUE
    }
    

    try(char) {
        
        if(typeof char !== 'string')throw Error('invalid input letter or word')


        if(!wordToGuess.includes(char)){
            attem--
            if(attem === 0){
                estado = Hangman.LOSE
                alert('You lose');
            }
            return false;
        } 
        
        for(var i = 0; i<wordToGuess.length; i++){
            if(char === wordToGuess[i]){
            emptyWord[i] = wordToGuess[i]
            found = true
            }
        }

        if(emptyWord.join('') === wordToGuess){
            estado = Hangman.WIN
            alert("You Won!")
        }
        

        return found;

    }

    guessed() {
        return emptyWord
    }

    attempts() {
        return attem
    }

    status() {
        return estado
    }

    static get WIN(){
        return 1
    }   
    static get LOSE(){
        return 2
    }   
    static get CONTINUE(){
        return 3
    }



}