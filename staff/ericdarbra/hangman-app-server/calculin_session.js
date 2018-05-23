const express = require('require')
const expressSession = require('express-session')

const app = express()

app.use(expressSession({
    secret: 'my secret',
    resave:false,
    saveUninitialized:true
}))

app.get('/add', () =>{
    const{ query: {n},session} = req
    if(typeof session.res !== 'number') session.res = 0

    session.res += parseFloat(n)
    res.send(session.res)

})