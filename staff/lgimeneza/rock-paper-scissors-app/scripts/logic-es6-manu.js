'use strict'

class RockPaperScissors {
    constructor(player1, player2) {
        this._player1 = player1
        this._player2 = player2
        this._symbols = ['rock', 'paper', 'scissors']
        this._rounds = []
        this._status = RockPaperScissors.CONTINUE
    }

    play(hand1, hand2) {
        if (typeof hand1 !== 'string' || typeof hand2 !== 'string' || this._symbols.indexOf(hand1 = hand1.trim().toLowerCase()) === -1 || this._symbols.indexOf(hand2 = hand2.trim().toLowerCase()) === -1) throw Error('invalid hands')

        if (this._status === RockPaperScissors.CONTINUE) {
            const round = { player1: hand1, player2: hand2 }

            this._rounds.push(round)

            this._updateStatus()
        } else throw Error('GAME OVER!')
    }

    _updateStatus() {
        if (this._rounds.length > 1) {
            const results = this._rounds.reduce((accum, round) => {
                const roundWinner = this._roundWinner(round)

                if (roundWinner) accum[roundWinner]++

                return accum
            }, { player1: 0, player2: 0 })

            let winning

            if (results.player1 > results.player2) winning = this._player1
            else if (results.player1 < results.player2) winning = this._player2

            if (winning) {
                this._status = RockPaperScissors.GAMEOVER
                this._winner = winning
            }
        }
    }

    _roundWinner(round) {
        if (round.player1 === 'rock' && round.player2 === 'scissors' || round.player1 === 'scissors' && round.player2 === 'paper' || round.player1 === 'paper' && round.player2 === 'rock') return 'player1'

        if (round.player1 === round.player2) return

        return 'player2'
    }

    status() { return this._status }

    state() { return this._rounds }

    winner() { return this._winner }

    static get CONTINUE() { return 0 }

    static get GAMEOVER() { return 1 }
}
