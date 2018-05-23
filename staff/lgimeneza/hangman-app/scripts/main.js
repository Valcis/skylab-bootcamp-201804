'use strict'

var hangman = new Hangman("hello", 8);

let word = document.getElementById('wordguessed');
word.innerText = hangman.guessed().join('');


let btnTry = document.getElementById('btntry');

btnTry.addEventListener('click', function(e){
    e.preventDefault();
    let txbHangWord = document.getElementById('txbHangManWord');
    let res = hangman.try(txbHangWord.value);
    txbHangWord.value ='';
    if(!res) drawHangman(8 -hangman._attempts+1);

    word.innerText = hangman.guessed().join('');
});

function drawHangman(attempts){
    if(attempts < 8) document.getElementById('imghangman').className = "hangman-" + attempts;
}





