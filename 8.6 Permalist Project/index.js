import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Connecting PostgreSQL
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "sher",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getItems() {
  return (await db.query("SELECT * FROM todolist")).rows;
}

app.get("/", async (req, res) => {
  try {
    items = await getItems();
  } catch (err) {
    console.log(err);
  }
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO todolist (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  try {
    await db.query("UPDATE todolist SET title = $1 WHERE id = $2;", [
      title,
      id,
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM todolist WHERE id = $1;", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
