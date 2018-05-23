'user strict'

const Hangman = require('./logic-1.0.1')

class HangmanRandom extends Hangman{

    constructor(){

        const ATTEMPTS = 7;
        const words = ['hello', 'world'];
        const random = Math.round(Math.random());

        const word = words[random]

        super(word, ATTEMPTS);

    }

}

module.exports = HangmanRandom