// ToRandomCase (Romina para àlex P.)


if (typeof Array.prototype.toRandomCase !== 'function'){
    Array.prototype.toRandomCase = function(){
        var new_array=[]

        function switchLetter(letter){ //switches to upper or lower depending on the original state   
            if (letter===letter.toUpperCase()) return letter.toLowerCase();
            if (letter===letter.toLowerCase()) return letter.toUpperCase();
        }

        function passToRandomCase(text){
            var arr_text= text.split('');
            length= arr_text.length; //marca un máximo de letras a cambiar
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
        }
        
        
        if (this.toString()=== new_array.toString()) throw(Error('empty array'))
        for(var i=0; i<this.length; i++){
            if (typeof this[i] !== 'string') throw(Error('not a string array'))
            new_array.push(passToRandomCase(this[i]))
        }

        return new_array

    }
}


//FilterPerson (Sergio to Sandy)

function Person(name, height, weight, age, gender){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.gender = gender;
}

function Married(name, height, weight, age, gender){
    Person.call(this, name, height, weight, age, gender)
}

function Single(name, height, weight, age, gender){
    Person.call(this, name, height, weight, age, gender)
}

Single.prototype = new Person();
Single.prototype.civilStatus= 'single';

Married.prototype = new Person();
Married.prototype.civilStatus= 'married'; 

var person1 = new Married('Jaime', 1.87, 65, 20, 'male');
var person2 = new Married('Helena', 1.57, 80, 32, 'female');
var person3 = new Single('Jaimie', 1.77, 65, 20, 'female');
var person4 = new Married('John', 1.77, 77, 29, 'male');
var person5 = new Married('Johnie', 1.77, 77, 29, 'female');
var person6 = new Single('Carla', 1.63, 56, 24, 'female');

var trialArray=[person1,person2,person3, person4, person5,person6];

Array.prototype.newFilter= function(func){
    var newArray= [];
    for(var i=0;i<this.length;i++){
        if (func(this[i])){
            newArray.push(this[i]);
        }
    }
    return newArray
}