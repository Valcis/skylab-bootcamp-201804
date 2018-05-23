'use strict'

class RockPaperScissors {

    constructor(player1, player2) {

        this.player1 = player1;
        this.player2 = player2;
        this._score = { p1: 0, p2: 0 }
        this._status = 0;
        this.stateArr = [];
        this.rounds = 0;
        this._winner = undefined;
    }


    play(hand1, hand2) {

        if (hand1 !== "rock" && hand1 !== "paper" && hand1 !== "scissors") throw Error("invalid hands")
        if (hand2 !== "rock" && hand2 !== "paper" && hand2 !== "scissors") throw Error("invalid hands")

        this.rounds++;

        let obj = { player1: hand1, player2: hand2 }
        this.stateArr.push(obj);
        rule(hand1, hand2, this);

    }

    status() {
        update(this);
        return this._status;
    }


    state() {
        update(this);
        return this.stateArr;
    }

    winner() {


        return this._winner;
    }



}

function update(obj) {

    if (obj._score.p1 === 2) {
        obj._status = 1;
        obj._winner = obj.player1
    }

    if (obj._score.p2 === 2) {
        obj._status = 1;
        obj._winner = obj.player2
    }


}

function rule(hand1, hand2, obj) {

    if (hand1 === "paper" && hand2 === "rock"|| hand1 === "scissors" && hand2 === "paper" || hand1 === "rock" && hand2 === "scissors"){
        obj._score.p1++
    } else if (hand2 === "paper" && hand1 === "rock"|| hand2 === "scissors" && hand1 === "paper" || hand2 === "rock" && hand1 === "scissors"){
        obj._score.p2++
    } else {
        if (this.rounds>=3){}
    }
    
    // if (hand1 === "paper" && hand2 === "rock") obj._score.p1++;
    // if (hand1 === "scissors" && hand2 === "paper") obj._score.p1++;
    // if (hand1 === "rock" && hand2 === "scissors") obj._score.p1++;

    // if (hand2 === "paper" && hand1 === "rock") obj._score.p2++;
    // if (hand2 === "scissors" && hand1 === "paper") obj._score.p2++;
    // if (hand2 === "rock" && hand1 === "scissors") obj._score.p2++;

    console.log(obj._score)

}

RockPaperScissors.CONTINUE = 0;
RockPaperScissors.GAMEOVER = 1;
