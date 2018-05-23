function pow(a, b, cb) {
    setTimeout(() => cb(a ** b), 0)
}

//pow(2, 2, console.log)

//pow(2, 2, res => pow(res, 3, console.log))

//pow(2, 2, res => pow(res, 3, res => pow(res, 4, console.log)))

pow(2, 2, function(res) {
    // console.log(res)

    pow(res, 3, function(res) {
        // console.log(res)

        pow(res, 4, console.log)
       
    })
})

// console.log('continue')
