// imports 
const express = require('express')

// express 
const app = express()
const port = 4000

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
    console.log(`Go to http://localhost:${port}`)
})
