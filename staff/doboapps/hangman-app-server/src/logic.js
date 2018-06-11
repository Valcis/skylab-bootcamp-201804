'use strict'
var Hangman = (function(){
    
class Hangman {

    constructor(word, numberAttempts = 10) {

        if (!(typeof word == "string"))
            throw Error('invalid word '+word);

        this.LOSE = 2;
        this.WIN = 3;
        this.theStatus = Hangman.CONTINUE;
        this.letterOrWord = "";
        this.numberAttempts = numberAttempts;
        this.wordArray = word.split("");
        this.wordStatus = this.wordArray.map(e => {
            return "_";
        });
        this.word = word;
    }


    try(input) {
        if (typeof input =="undefined"){
            throw Error('invalid letter or word '+input);

        }
        

        this.letterOrWord = input;

        if(!(this.word.indexOf(input) >= 0)){
            this.numberAttempts--;
        }

        return (this.word.indexOf(input) >= 0)
    }


    guessed() {   

        let wordAttempt =this.letterOrWord.split("");

        if(this.letterOrWord.length>1 && equalArray(wordAttempt,this.wordArray)){  
            this.theStatus = 1;
            return wordAttempt;            
        }else if (this.letterOrWord.length>1 && !equalArray(wordAttempt,this.wordArray)){
           this.numberAttempts=0;
            this.theStatus = 2;
        }


        this.wordArray.forEach((element, i) => {

            if (this.letterOrWord == element) {
                return this.wordStatus[i] = this.letterOrWord;
            }
        });
               

        if(equalArray(this.wordStatus,this.wordArray)) this.theStatus = 1;

        if(this.numberAttempts==0) this.theStatus = 2;


        return this.wordStatus;

    }

    attempts() {
        return this.numberAttempts;
    } 

    status() {
        return this.theStatus;
    }
}

const equalArray = (arr1 ,arr2)=>  arr1.toString() == arr2.toString()

return Hangman}
)()

Hangman.CONTINUE=0;
Hangman.WIN=1;
Hangman.LOSE=2;


module.exports = Hangman