const[_node, _process, ...oper] = process.argv

var sum = oper.reduce((acc, v) => parseInt(acc) + parseInt(v))

console.log(sum)


