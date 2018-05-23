function pow(a, b, cb) {
  setTimeout(() => cb(a ** b), 0)
}

pow(2, 2, function(res) {



  pow(res, 3, function(res) {
    
  

      pow(res, 4, console.log)
  })
})
