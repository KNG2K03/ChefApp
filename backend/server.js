// imports 
const express = require('express')
const body_parser = require('body-parser')
const mdb = require('mongoose')

// express 
const app = express()
const port = 4000

// body parser
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// mongoose
mongodb_connect().catch((err) => { console.log(err) })

// connecting to database
async function mongodb_connect() {
    await mdb.connect("mongodb+srv://hello:there@datarepdb.fhnaepc.mongodb.net/?appName=DataRepDB")
    console.log('Database Connected!\n')
}

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
    console.log(`Go to http://localhost:${port}`)
})
