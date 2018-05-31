const jwt = require('jsonwebtoken')

const secret = 'a secret'

const token = jwt.sign({ message: 'Hello, World!' }, secret, { expiresIn: 3 })

console.log(token)

const payload = jwt.verify(token, secret)

console.log(payload)

console.log(new Date(payload.iat * 1000).toLocaleString())
console.log(new Date(payload.exp * 1000).toLocaleString())

setTimeout(() => {
    jwt.verify(token, secret)
}, 3000)