import express from "express"

const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send("Hello From Node server")
})

app.listen(port, ()=>{
    console.log(`Server listening to port ${port}.`)
})