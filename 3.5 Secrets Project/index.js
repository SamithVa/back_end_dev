//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express"
import bodyParser from "body-parser"

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 3000

let authorized = false

app.use(bodyParser.urlencoded({extended: true}))


// Alternative solution make check authorization process into function, then app.use(func)
// cleaner code

function checkAuthorized(req, res, next){
    let password = req.body.password
    authorized = (password === 'ILoveProgramming') ? true : false
    next()
}

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/public/index.html")
})

app.use(checkAuthorized)

app.post('/check', (req, res) => {
    if(authorized){
        res.sendFile(__dirname + "/public/secret.html")
    }
    else{
        res.redirect('/')
    }
})

app.listen(port, () =>{
    console.log(`Server is running at port ${port}.`)
})