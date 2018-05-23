<<<<<<< HEAD
class Calculator {
  constructor() {
    this._status = ""
    this._lastGiveNumber = 0
    this._accumulated = 0 
  }

  one() {
    this._status += 1;
    this._lastGiveNumber= Number(this._status)
  }

  two() {
    this._status += 2;
    this._lastGiveNumber= Number(this._status)
  }

  three() {
    this._status += 3;
    this._lastGiveNumber= Number(this._status)
  }

  four() {
    this._status += 4;
    this._lastGiveNumber= Number(this._status)
  }

  five() {
    this._status += 5;
    this._lastGiveNumber= Number(this._status)
  }

  six() {
    this._status += 6;
    this._lastGiveNumber= Number(this._status)
  }

  seven() {
    this._status += 7;
    this._lastGiveNumber= Number(this._status)
  }

  eight() {
    this._status += 8;
    this._lastGiveNumber= Number(this._status)
  }

  nine() {
    this._status += 9;
    this._lastGiveNumber= Number(this._status)
  }

  zero() {
    this._status += 0;
    this._lastGiveNumber= Number(this._status)
  }

  status() {
    
    return Number(this._status);
  }

  sum() {   

    console.log([this._lastGiveNumber,this._accumulated,this._status])
    
    this._accumulated+=this._lastGiveNumber
    
    this._lastOperatorCalled= '+'

    

    console.log([this._lastGiveNumber,this._accumulated,this._status])
    
    

  }

  // subs() {
  //   this._lastOperatorCalled= '-'
  //   this._status= (this.accum).toString()
  // }

  // mul() {
  //   this._lastOperatorCalled= '*'
  //   this._status= (this.accum).toString()
  // }

  // div() {
  //   this._lastOperatorCalled= '/'
  //   this._status= (this.accum).toString()
  // }

  // negate() {
  //   this._status= '-'+this._status
  // }

  result() {
    if (this._lastOperatorCalled=== '+') this._status=(this._accumulated).toString()
  }

  

}
=======
>>>>>>> features/react
