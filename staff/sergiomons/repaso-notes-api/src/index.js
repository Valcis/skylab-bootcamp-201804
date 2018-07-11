'use strict'

const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes')

// const port = process.argv[2] || 3000

const port = process.env.PORT

mongoose.connect('mongodb://localhost:27017/skylab-bootcamp-201804')
    .then(() => {
        const app = express()

        app.use('/api/users/', router) // middleware
        
        app.listen(port, () => console.log(`running server on port ${port}`))
        
        process.on('SIGINT', () => {
            console.log('\nclosing server')
            
            process.exit()
        })

    }).catch(err => {
        
        console.log('App started errors:', err.stack);

        process.exit();
    })