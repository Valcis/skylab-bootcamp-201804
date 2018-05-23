'use strict';
function cube(numbers){

    if (numbers instanceof Array || typeof numbers === 'number'){
        if (numbers instanceof Array){
            for(var i=0;i<numbers.length;i++){
                if (typeof numbers[i] !== 'number'){
                    throw Error('input array is not a number at index ')
                }
                numbers[i]= numbers[i]**3;
            }
            return numbers;
        }else{
            return numbers**3;
        }
    }


    throw Error('input is wrong type')
}