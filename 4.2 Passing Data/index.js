import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let name = ''

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs')
});

app.post("/submit", (req, res) => {
  name = req.body['fName']  + req.body['lName']
  res.render('index.ejs', {nameLength: name.length})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
