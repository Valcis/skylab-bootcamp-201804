'use strict'
const Calculator = (function () {
    class Calculator{
        constructor(){

            this._strdisplay = '0';
            this._numA = 0;
            this._pendingOp = "";
            this._numSwitch = 0;

        }

        one(){this.number('1')}
        two(){this.number('2')}
        three(){this.number('3')}
        four(){this.number('4')}
        five(){this.number('5')}
        six(){this.number('6')}
        seven(){this.number('7')}
        eight(){this.number('8')}
        nine(){this.number('9')}
        zero(){this.number('0')}
        sum(){this.operate('+')}
        sub(){this.operate('-')}
        mul(){this.operate('*')}
        div(){this.operate('/')}

        percent(){
            this._strdisplay = Number(this._strdisplay) / 100;
        }

        allClear(){
            this._strdisplay = '0';
            this._numA = 0;
            this._pendingOp = "";
        }

        negate(){
            this._strdisplay = -this._strdisplay;
        
            this._numSwitch = 0;
        }

        status(){
            return Number(this._strdisplay)
        }

        operate(operator){

            if (this._numA == 0){
                this._numA = Number(this._strdisplay);
                this._pendingOp = operator;
            } else {
                if (this._pendingOp != ""){
                    this._numA = calculateMac(this._numA, this._strdisplay, this._pendingOp);
                    this._strdisplay = Number(this._numA);
                }
                this._pendingOp = operator;
            }
        
            this._numSwitch = 0;
        
        }

        number(num){

            if (this._strdisplay == '0' | this._numSwitch == 0) {
                this._strdisplay = num
            } else {
                this._strdisplay += num
            }

            this._numSwitch = 1
        }

        result(){

            if (this._pendingOp != ""){
                this._numA = calculateMac(this._numA, this._strdisplay, this._pendingOp);
                this._strdisplay = Number(this._numA);
                this._pendingOp = "";
            }
        
            this._numSwitch = 0;
        
        }
    }
    function calculateMac(numA, numB, operator){

        switch (operator) {
            case '+':
                return Number(numA) + Number(numB); 
                break;
            case '-':
                return Number(numA) - Number(numB); 
                break;
            case '*':
                return Number(numA) * Number(numB); 
                break;
            case '/':
                return Number(numA) / Number(numB); 
                break;
            default:
                break;
        }
    
    }
    
    return Calculator
})();