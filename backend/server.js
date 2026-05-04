// imports 
const express = require('express')
const body_parser = require('body-parser')

// express 
const app = express()
const port = 4000

// body parser
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
    console.log(`Go to http://localhost:${port}`)
})
