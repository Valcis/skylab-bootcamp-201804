'use strict'
var Hangman = (function () {
    class Hangman {
        constructor (wordToGuess, attempts = 10) {
            if ((typeof attempts !== "number")||(attempts < 1)) throw Error("invalid attempts");
            this.att = attempts;  
            this.word(wordToGuess);
            this.w = wordToGuess.trim();
            this.w_split = wordToGuess.trim().split("").map (v => '_');
            this.stat = Hangman.CONTINUE;
        }

        word(wordToGuess) {
            if (typeof wordToGuess !== "string") throw Error('invalid word ' + wordToGuess);
            return wordToGuess.trim().split("");
        }

        try(str){
            if (typeof str !== "string") throw Error ('invalid letter or word ' + str);
            let stat = 0;
            let bool = true;
            if (str.length > 1){
                if (str === this.w) {
                    this.w_split = this.w.split("");
                    stat = 1;
                } else {
                    this.att = 0;
                    stat = 2;
                    bool = false;
                }
            } 
            if (!stat){
                if  (this.w.indexOf(str) === -1) {
                    this.att--;
                    bool = false;
                }
                let word = this.w.split("");
                for(let i = 0; i < word.length; i++){
                    if (word[i] === str) {
                        console.log(i + " " + word[i]);
                        this.w_split[i] = str;
                    }
                }
            }
            if (this.w_split.indexOf('_') === -1) this.stat = Hangman.WIN;
            if (this.att === 0) this.stat = Hangman.LOSE;
            
            return bool;
        }

        guessed() {
            return this.w_split;
        }

        status() { return this.stat;}

        attempts() { return this.att}
        
    }

    Hangman.CONTINUE = 0;
    Hangman.WIN = 1;
    Hangman.LOSE = 2;

    return Hangman;
})();

