function pow(a, b) {
    return Promise.resolve()
        .then(() => a ** b)
}

pow(2, 2)
    .then(res => 
        pow(res, 3)
    )
    .then(res => 
        pow(res, 4)
    )
    .then(console.log)

