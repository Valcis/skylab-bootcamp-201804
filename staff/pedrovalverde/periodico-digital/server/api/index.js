'use strict'

require('dotenv').config()
const { mongoose } = require("data")
const express = require('express')
const router = require('./routes')
const cors = require('cors')

const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL)
  .then(() => {
    const port = PORT || process.argv[2] || 5000

    const app = express()
    app.use(cors())
    app.use('/api', router)

    app.listen(port, () => console.log(`Server running on port ${port}`))

    process.on('SIGINT', () => {
      console.log('\nStopping Server')

      mongoose.connection.close(() => {
        console.log('DB connection closed')

        process.exit()
      })
    })
  })
  .catch(console.error)