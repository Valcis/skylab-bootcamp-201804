// function forEach(array, action) {
//     if (typeof action=== "function" && array instanceof Array)
//     var index=0;
//     function iterate(index) {
//     action(array[index],index,array);
//     index++
//     if (index<array.length) iterate(index);
//   }
//   iterate (index);
// }
'use strict'

function forEach(array, action){
  if (typeof action!== "function" && !(array instanceof Array)) throw Error('wrong input(s)')
  function iterate(index){
    if (index<array.length){
      action(array[index])
      index++
      iterate(index)
    }
  }

  iterate(0)
}

