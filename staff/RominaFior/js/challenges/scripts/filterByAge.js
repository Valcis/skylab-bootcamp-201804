
'use strict';
/**
 * The filter() method creates an array filled with all array elements that pass a test 
 * (provided as a function).
 * 
 * @example 
 * var ages = [32, 33, 16, 40]; 
 * function checkAdult(age) {return age >= 18;}
 * function myFunction() {
 * ages.filter(checkAdult);
 * }
 * @param {Function} func -A function to be run for each element in the array.
 * 
 * @throws {Error} If func is not a function.
 * 
 * @returns -An Array containing all the array elements that pass the test.
 *  If no elements pass the test it returns an empty array.
 */


if(typeof Array.prototype.filter !== 'function') {

Array.prototype.filter=function(func) {
  var res = [];

  for (var i = 0; i < this.length; i++) {
      var val = this[i];

      if (func(val)) res.push(val);
  }

 return res;
}
}
/**
 * The function returns only the people names with age greater than 18.
 * 
 * @example
 * var people[{name:'Pedro', age:15}, {name:'Juana', age:21}] ->['Juana']
 * 
 * @param {Array} people -The array with all the names and ages
 * @param {Function} fn -A function to filter the names by ages.
 * 
 * @throws {Error} - If input array is not valid.
 * @throws {Error} - If fn is not a function.
 * 
 * @returns {Array} -A new array filled with all array elements that pass a test.
 * 
 */

var people = [
  { name: 'Juan', age: 20 },
  { name: 'Albertito', age: 15 },
  { name: 'Maider', age: 23 },
  { name: 'Alejandra', age: 17 }
];



function filterByAge(people, fn) {
  if (!(people instanceof Array)) throw Error('input array is not valid');

  if (!(fn instanceof Function)) throw Error('input function is not valid');

  var filteredPeople = people.filter(fn);

  // var filteredPeople = [
  //   { name: 'Juan', age: 20 },
  //   { name: 'Maider', age: 23 },
  // ];

  var names = filteredPeople.map(function(person) {
    return person.name;
  });

  // var names = ['Juan', 'Maider'];

  return names;

}

var names = filterByAge(people, function(person) {
  if (person.age > 18) {
    return true;
  }
});

console.log(names);

