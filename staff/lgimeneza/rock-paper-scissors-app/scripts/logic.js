'use strict'

class RockPaperScissors {
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._winsPlayer1 = 0;
        this._winsPlayer2 = 0;
        this._state = [];
        this._status = RockPaperScissors.CONTINUE;
    }

    play(hand1, hand2){
        let invalidHands = Error('invalid hands');

        if (typeof hand1 !=='string') throw invalidHands;
        if (typeof hand2 !=='string') throw invalidHands;

        this._hand1 = hand1.trim().toLowerCase();
        this._hand2 = hand2.trim().toLowerCase();

        if (!this._handValid(this._hand1)) throw invalidHands;
        if (!this._handValid(this._hand2)) throw invalidHands;

        if (this._status === RockPaperScissors.GAMEOVER) throw Error('GAME OVER!')

        this._state.push({ player1: this._hand1, player2: this._hand2});

        if (this._hand1 === 'paper' && this._hand2 === 'rock' ||
            this._hand1 === 'scissors' && this._hand2 === 'paper' ||
            this._hand1 === 'rock' && this._hand2 === 'scissors') {
            this._winsPlayer1++
        } else if (this._hand1 === 'rock' && this._hand2 === 'paper' ||
            this._hand1 === 'paper' && this._hand2 === 'scissors' ||
            this._hand1 === 'scissors' && this._hand2 === 'rock') {
            this._winsPlayer2++;
        }

        if (this._winsPlayer1 === 2 | this._winsPlayer2 === 2){
            this._status = RockPaperScissors.GAMEOVER;

            if (this._winsPlayer1 === 2){
                this._winner = this._player1;
            } else {
                this._winner = this._player2;
            }
        } else {
            this._status = RockPaperScissors.CONTINUE;
        }
    }

    state(){ return this._state; }

    status(){ return this._status; }

    winner(){ return this._winner; }

    static get CONTINUE(){ return 1; }

    static get GAMEOVER(){ return 2; }

    _handValid(hand){
        if (hand === 'rock' | hand === 'paper' | hand === 'scissors') return true;

        return false;
    }
}