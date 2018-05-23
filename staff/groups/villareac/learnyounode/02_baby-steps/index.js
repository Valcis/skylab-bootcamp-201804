const[_node, _process, ...oper] = process.argv

var sum = oper.reduce((acc, v) => Number(acc) + Number(v))

console.log(sum)


