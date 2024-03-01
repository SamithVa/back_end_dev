import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 3000


app.get('/', (req, res) => {
    const date = new Date("March 2, 2024")
    const today = date.getDay()
    let task = ''
    let dayType = ''
    if(today === 0 || today === 6){
        dayType = 'weekend'
        task = 'have some fun'
    }
    else{
        dayType = 'weekday'
        task = 'work hard'
    }

    res.render(__dirname + '/views/index.ejs', {
        today: dayType,
        task: task
    })
})


app.listen(port, () =>{
    console.log(`Server starting at port ${port}.`)
})
