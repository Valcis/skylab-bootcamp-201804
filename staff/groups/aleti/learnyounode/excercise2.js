
const numbers = process.argv
const res = 0

for (var i = 2; i < process.argv.length; i++){
    res += Number(numbers[i])
}

console.log(res)