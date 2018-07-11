Array.prototype.toRandomCase = function (){
    
    var toRandomCase =[];
    var randomNumber;
    var changed='';
    for (var j = 0; j < this.length; j++) {
        for (var i = 0; i < this[j].length; i++) { 
            randomNumber= Math.round(Math.random());
            
               if (randomNumber === 0) {
                   
                changed+=this[j][i].toLowerCase();
                   
               }else{
                changed+=this[j][i].toUpperCase();
               }           
        } 
        toRandomCase.push(changed);
        changed='';
    }
    
    return toRandomCase;
};
var a= ['albanelia', 'rominasanchez'];
console.log(a.toRandomCase());