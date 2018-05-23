'use strict';

class RockPaperScissors{

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this._status = RockPaperScissors.CONTINUE;
    this._state = [];
    this._score1  = 0;
    this._score2 = 0;
    this._tie = 0;
    this._winner = undefined;
  }

  play(hand1, hand2){
    if (this._status === RockPaperScissors.GAMEOVER) throw Error('GAME OVER!');

    if (typeof hand1 !== 'string') throw Error('invalid hands');
    if (typeof hand2 !== 'string') throw Error('invalid hands');

    hand1 = hand1.trim().toLowerCase();
    hand2 = hand2.trim().toLowerCase();

    if (hand1 !== 'rock' && hand1 !== 'scissors' && hand1 !== 'paper' ) throw Error('invalid hands');
    if (hand2 !== 'rock' && hand2 !== 'scissors' && hand2 !== 'paper' ) throw Error('invalid hands');

    this._state.push({'player1': hand1, 'player2': hand2});

    this._rounds(hand1,hand2);
    this._update();

  }
  static get CONTINUE() { return 0}

  static get GAMEOVER() { return 1}



  status() {
    return this._status;
  }

  state() {
    return this._state;
  }

  winner() {
    return this._winner;
  }


  _rounds(hand1, hand2){
    if (hand1 !== hand2) {
      if (hand1 == 'rock' && hand2 == 'scissors' || hand1 == 'scissors' && hand2 == 'paper' || hand1 == 'paper' && hand2 == 'rock') {
        this._score1 += 1;
      } else {
        this._score2 += 1;
      }
    } else {
      this._tie +=1;
    }

  }

  _update() {
    if (this._score1 === 2) {
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player1;
    } else if (this._score2 === 2) {
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player2;
    } else if (this._tie === 2 && this._score1 === 1 && this._score2 === 0) {
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player1;
    } else if (this._tie === 2 && this._score1 === 0 && this._score2 === 1) {
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player2;
    } else if (this._tie === 4 && this._score1 === 0 && this._score2 === 1){
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player2;
    } else if (this._tie === 4 && this._score1 === 1 && this._score2 === 0){
      this._status = RockPaperScissors.GAMEOVER;
      this._winner = this.player1;
    } else {
      this._status = RockPaperScissors.CONTINUE
    }
  }


}


