'use strict';
/**
 * filter names by age
 * @example
 * var result = filterByAge(array, function(person) {
 * return person.age > 18;
 * }); // -> result = ['Juan', 'Maider'];
 * 
 * @param {object} people -
 * @param {function} fn -
 */
function filterByAge(people, fn) {
  var filteredPeople = people.filter(fn);

  var names = filteredPeople.map(function(person) {
    return person.name;
  });

  return names;
}

var array = [
  { name: 'Juan', age: 20 },
  { name: 'Albertito', age: 15 },
  { name: 'Maider', age: 23 },
  { name: 'Alejandra', age: 17 }
];

var result = filterByAge(array, function(person) {
  return person.age > 18;
});

console.log(result);
