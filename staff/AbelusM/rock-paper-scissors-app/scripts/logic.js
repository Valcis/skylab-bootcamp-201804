'use strict'

class RockPaperScissors {
    constructor(player1, player2) {

        this.player1 = player1
        this.player2 = player2
        this._status = RockPaperScissors.CONTINUE
        this.rounds = 0
        this.count1 = 0
        this.count2 = 0
        this.control = ['rock', 'paper', 'scissors']
    }

    play(hand1, hand2) {
        if (typeof hand1 !== 'string' || typeof hand2 !== 'string' || this.control.indexOf(hand1 = hand1.trim().toLowerCase()) === -1 || this.control.indexOf(hand2 = hand2.trim().toLowerCase()) === -1) throw Error('invalid hands')

        if (hand1 !== hand2) {
            if (
                hand1 === 'rock' && hand2 === 'scissors' ||
                hand1 === 'paper' && hand2 === 'rock' ||
                hand1 === 'scissors' && hand2 === 'paper') {
                this.count1++
                this.rounds++
            } else {
                this.count2++
                this.rounds++
            }
        }
    }

    status() {
        if (this._status < 2)
            return this._status;
        if (this.count1 === 2)
            this._status = RockPaperScissors.GAMEOVER
        return this.player1
        if (this.count2 === 2)
            this._status = RockPaperScissors.GAMEOVER
        return this.player2
    }


    winner() {
        if (this._status === RockPaperScissors.CONTINUE) {
            return undefined
        }
        if (this.count1 === 2)
            this._status = RockPaperScissors.GAMEOVER
        return this.player1
        if (this.count2 === 2)
            this._status = RockPaperScissors.GAMEOVER
        return this.player2
    }

    static get CONTINUE() { return 0 }

    static get GAMEOVER() { return 1 }
}




