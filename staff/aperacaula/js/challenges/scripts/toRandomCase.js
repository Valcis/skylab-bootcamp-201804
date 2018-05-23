'use strict';
function switchLetter(letter){ //switches to upper or lower depending on the original state   
    if (letter===letter.toUpperCase()) return letter.toLowerCase();
    if (letter===letter.toLowerCase()) return letter.toUpperCase();
 

}

function toRandomCase(text){
    if (typeof text ==='string'){
        var arr_text= text.split('');
        var length= arr_text.length; //marca un máximo de letras a cambiar
        var random_pos= []; //marcara qué posiciones cambiarán
        var num_random= Math.floor((Math.random() * length) + 1); //determina cuantas letras cambiarán su estado
        var index=0;
        while (index<num_random){
            var random_index=Math.floor((Math.random() * length-1) + 1);
            if (!(random_pos.includes(random_index))) random_pos.push(random_index); //guarda las posiciones que cambiarán
            index++;
        }
        
        for (var i=0;i<random_pos.length; i++){
            arr_text[random_pos[i]]= switchLetter(arr_text[random_pos[i]]);
        }

         return arr_text.join('');

    }else{
        throw Error('input is not a string');
    }

}
