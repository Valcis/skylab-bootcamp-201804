'use strict';

module.exports = (function () {
  class Hangman {
    constructor(word, attempts = 10) {
      if (typeof word !== 'string') throw Error('invalid word ' + word)

      this._word = word.trim()

      if (!this._word.length) throw Error('word cannot empty or blank')

      this._attempts = attempts

      if (typeof this._attempts !== 'number') throw Error('invalid attempts ' + this._attempts)

      if (this._attemps <= 0) throw Error('invalid number of attempts ' + this._attempts)

      this._guessed = new Array(this._word.length).fill('_')

      this._status = Hangman.CONTINUE
    }

    guessed() {
      return this._guessed
    }

    attempts() {
      return this._attempts
    }

    status() {
      return this._status
    }

    try(text) {
      if (typeof text !== 'string') throw Error('invalid letter or word ' + text)

      text = text.trim();

      if (!text.length) throw Error('text cannot empty or blank');

      if (this._status === Hangman.CONTINUE && this._attempts > 0)
        return text.length === 1 ? tryLetter(this, text) : tryWord(this, text)

      return false;
    }

    static get CONTINUE() { return 0 }

    static get WIN() { return 1 }

    static get LOSE() { return 2 }
  }

  // Hangman.CONTINUE = 0;
  // Hangman.WIN = 1;
  // Hangman.LOSE = 2;

  function tryLetter(inst, letter) {
    const index = inst._word.indexOf(letter)

    let match = false

    if (index > -1) {
      for (let i = index; i < inst._word.length; i++) {
        const char = inst._word[i]

        if (char === letter) inst._guessed[i] = char
      }

      match = true
    } else inst._attempts--

    update(inst)

    return match
  }

  function tryWord(inst, word) {
    let match = false

    if (word === inst._word) {
      for (var i = 0; i < inst._word.length; i++)
        inst._guessed[i] = inst._word[i]

      match = true
    } else inst._attempts = 0

    update(inst)

    return match
  }

  function update(inst) {
    if (!inst._attempts)
      inst._status = Hangman.LOSE
    else if (inst._guessed.indexOf('_') === -1)
      inst._status = Hangman.WIN
    else
      inst._status = Hangman.CONTINUE
  }

  return Hangman
})()

