// imports 
const express = require('express')
const body_parser = require('body-parser')
const mdb = require('mongoose')
const cors = require('cors')
const { first, last } = require('rxjs')

// express 
const app = express()
const port = 4000

// body parser
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// mongoose
mongodb_connect().catch((err) => { console.log(err) })

// cors 
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// active chef account id
let active_chef_id = "69f8cc0f6ed00851678fb229"

app.post('/signup', async (req, res) => {
    // get credentials from request
    let firstname = req.body.user.fname
    let lastname = req.body.user.lname
    let username = req.body.user.uname
    let password = req.body.user.pass
    let recipe_book = req.body.user.rb
    
    // CHECK TO SEE IF EVERYTHING WORKS 
    // console.log(`Username: ${username}\nPassword: ${password}`)
    // console.log("Recipe Book:")
    // for (let x of recipe_book) console.log(x)

    if (firstname.length === 0 || lastname.length === 0 || username.length === 0 || password.length === 0) {
        res.status(500).json({
            message: "Some of the credentials are empty"
        })
    }
    else {
        Chef.create({
            first_name:firstname,
            last_name:lastname,
            user_name:username,
            pass_word:password,
            recipe_book:recipe_book
        })
        .then(() => {
            console.log(`New document created in database.\nData Recorded:\nUsername: ${username}\nPassword: ${password}`)
        }).catch((error) => {
            console.log(`An error has occured\nError: ${error}`)
        })

        //now that the document has been created, this won't return null
        let chef = await Chef.findOne({user_name:username, pass_word:password})
        //and now we can set the active id for the session
        active_chef_id = chef.id
        // console.log(active_chef_id)
        
        res.status(200).json({
            message: "Successfully Signed Up!",
            chef : {
                chef_fname: chef.first_name,
                chef_lname: chef.last_name,
                chef_uname: chef.user_name,
                chef_recipe_book: chef.recipe_book
            }
        })
    }
})

app.post('/signin', async (req, res) => {
    let username = req.body.user.uname
    let password = req.body.user.pass
    // console.log(`Username: ${username}\nPassword: ${password}`)

    // find chef with the correct credentials
    let chef = await Chef.findOne({user_name: username, pass_word: password})
    if (chef !== null) {
        // set the active id for the session
        active_chef_id = chef.id

        res.status(200).json({
            message: "Successfully Signed In!",
            chef : {
                chef_fname: chef.first_name,
                chef_lname: chef.last_name,
                chef_uname: chef.user_name,
                chef_recipe_book: chef.recipe_book
            }
        })
    }
    else {
        res.status(500).json({
            message: "Data could not be found!"
        })
    }

})

app.put('/addCollection', async (req, res) => {
    let collection_name = req.body.cname

    // get chef from database 
    let chef = await Chef.findById(active_chef_id)

    chef.recipe_book.push({name: collection_name, meals: []})

    chef.save()

    res.status(200).json({
        message: `Successfully created collection ${collection_name}`
    })
})

app.put('/removeCollection', async (req, res) => {
    let collection_name = req.body.cname

    // get chef from database 
    let chef = await Chef.findById(active_chef_id)

    for (let i = 0; i <= chef.recipe_book.length; i++) {
        if (chef.recipe_book[i].name === collection_name) {
            chef.recipe_book.pull(chef.recipe_book[i])
            break;
        }
    }

    chef.save()

    res.status(200).json({
        message: `Successfully removed ${collection_name}`
    })
})

app.put('/addRecipe', async (req,res) => {
    let collection_name = req.body.cname
    let recipe_id = req.body.rid 

    // get chef from database 
    let chef = await Chef.findById(active_chef_id)

    for(let i = 0; i <= chef.recipe_book.length - 1; i++) {
        if (chef.recipe_book[i].name === collection_name) {
            chef.recipe_book[i].meals.push(recipe_id)
            break;
        }
    }
    
    chef.save()
    
    res.status(200).json({
        message: `Successfully added ${recipe_id} to ${collection_name}`
    })

})

app.put('/removeRecipe', async (req, res) => {
    let collection_name = req.body.cname
    let recipe_id = req.body.rid 

    // get chef from database 
    let chef = await Chef.findById(active_chef_id)

    for(let i = 0; i <= chef.recipe_book.length - 1; i++) {
        if (chef.recipe_book[i].name === collection_name) {
            chef.recipe_book[i].meals.pull(recipe_id); 
            break;
        }
    }

    chef.save()

    res.status(200).json({
        message: `Successfully removed ${recipe_id} to ${collection_name}`
    })

})

app.listen(port, () => {
    console.log(`App listening on port ${port}...`)
    console.log(`Go to http://localhost:${port}`)
})
