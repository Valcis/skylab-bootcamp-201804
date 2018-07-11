"use strict";

/**
 * @param {string} name
 * @param {number} height
 * @param {number} weight
 * @param {weight} age
 * @param {string} gender 
 */

function Person(name, height, weight, age, gender){
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.gender = gender;
}

function Married(name, height, weight, age, gender){
    Person.call(this, name, height, weight, age, gender);
}

Married.prototype = new Person();

function Single(name, height, weight, age, gender) {
    Person.call(this, name, height, weight, age, gender);
}

Single.prototype = new Person();


if (typeof Array.prototype.filterPerson !== "function"){
    Array.prototype.filterPerson = function(condition) {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            var val = this[i];

            if (val.height > 1.65 && val.weight > 70){
                res.push(val);
            }

            return val;
            
        }
    }
};