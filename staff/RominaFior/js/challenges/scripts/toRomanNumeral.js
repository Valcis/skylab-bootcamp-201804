'use strict';
/**
 * toRomanNumeral generates a randon number between 1 and 9, and it transforms it in a roman numeral
 * 
 * @example
 */

function toRomanNumeral(num) {
    
    if (typeof num !== 'number' )
        throw Error('input num is not a number');
    
    switch (num) {
        
    
    case 1:
        num = "I";
        break;
    case 2:
        num = "II";
        break;
    case 3:
        num = "III";
        break;
    case 4:
        num = "IV";
        break;
    case 5:
        num = "V";
        break;
    case 6:
        num = "VI";
        break;
    case  7:
        num = "VII";
        break;
    case 8:
        num = "VIII"
        break;
    case 9:
        num = "IX"
        break;
    default:
        num = "Please insert a number from 1 to 9";            
    }
    return num;
}

