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

// database chef schema 
const chef_schema = new mdb.Schema({
    first_name: String, // chef's first name 
    last_name: String, // chef's last name 
    user_name: String, // chef's username 
    pass_word: String, // chef's password 

    // this variable is the recipe book
    // here is an example of a member of this variable: {"Breakfast": ["52854", "52855", "53080"]}
    // Breakfast is the name of the category
    // and the array within contains IDs to different meals (most likely breafast meals)
    recipe_book: [{name: String, meals:[String]}] 
});

// database 'chef' model
const Chef = mdb.model('Chefs', chef_schema)

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
    console.log(`Go to http://localhost:${port}`)
})
