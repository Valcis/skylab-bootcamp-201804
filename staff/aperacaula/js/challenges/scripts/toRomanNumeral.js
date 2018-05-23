"use strict";
function toRomanNumeral(numero) {
  if (typeof numero === "number") {
    var arr=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
    return (arr[numero-1]);

  }else{
      throw Error('input is not a string');
  }
}
