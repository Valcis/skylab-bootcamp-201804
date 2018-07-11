"use strict";

function randomPropertiesValuesWithoutRepeating(array, propertyName, propertiesArray) {

    if (!Array.isArray(array)) {throw Error("First parameter must be an array.")};
    array.forEach(function (v){ if (typeof v !== "object") throw Error("Array has to content objects")});
    if (typeof propertyName !== "string") {throw Error("Second parameter must be a string.")};
    if (!Array.isArray(array)) {throw Error("Third parameter must be an array.")};
    
    var copyPropArray = []; 

    for (var i = 0; i < array.length; i++){
        if (copyPropArray.length === 0) {
            propertiesArray.forEach(function(v){ copyPropArray.push(v)});
        }

        var rand = Math.floor(Math.random() * copyPropArray.length);

        array[i][propertyName] = copyPropArray[rand];
        copyPropArray.splice(rand, 1);
    }
}


var prop_Col = ["red", "black", "white"];
var prop_Boolean = [true, false];
var prop_ABC = ["A", "B", "C", "D", "E", "F"];

var obj1 = [{property: "", color: ""},{property: "", color: ""},{property: "", color: ""},
{property: "", color: ""},{property: "", color: ""},{property: "", color: ""}];


