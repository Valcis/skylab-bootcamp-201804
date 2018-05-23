let nums= process.argv.slice(2)

nums= nums.map(num=> parseInt(num))

sum = nums.reduce((accum,actual)=> accum+actual)

console.log(sum)