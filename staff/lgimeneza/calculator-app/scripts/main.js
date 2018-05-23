'use strict'

var calculator = new Calculator();

function btnOperatorOnClick(operator){
    calculator.operate(operator)
    document.getElementById("display").innerHTML = calculator.status();
}

function btnEqualsOnClick(){
    calculator.result()
    document.getElementById("display").innerHTML = calculator.status();
}

function btnNumOnClick(num){
    calculator.number(num)
    document.getElementById("display").innerHTML = calculator.status();
    
    document.getElementById("btnAC").innerHTML = 'C';
}

function btnAcOnClick(){
    calculator.allClear();

    document.getElementById("display").innerHTML = calculator.status();

    document.getElementById("btnAC").innerHTML = 'AC';
}

function btnNegativeOnClick(){
    calculator.negate()
    document.getElementById("display").innerHTML = calculator.status();
}

function btnPercentOnClick(){
    calculator.percent()
    document.getElementById("display").innerHTML = calculator.status();
}

// Style section ...

function changeColorOnMouseDown(id, color)
{
    document.getElementById( id).style.backgroundColor = getColorMouseDown(color);
}

function changeColorOnMouseUp(id, color)
{
    document.getElementById(id).style.backgroundColor = getColorMouseUp(color);
}

function getColorMouseDown(color){

    switch (color) {
        case 'grey':
            return 'rgb(178, 178, 178)';
            break;
        case 'orange':
            return 'rgb(195, 117, 48)';
            break;
        default:
            break;
    }

}

function getColorMouseUp(color){

    switch (color) {
        case 'grey':
            return 'rgb(224, 224, 224)';
            break;
        case 'orange':
            return 'rgb(250,146,69)';
            break;
        default:
            break;
    }

}