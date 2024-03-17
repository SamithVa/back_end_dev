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

let items = {};
let listTitles = ["Today", "Week", "Month"];

async function getItems() {
  const items_tmp = {};
  try {
    await Promise.all(
      listTitles.map(async (listTitle) => {
        let lists = await db.query(
          "SELECT * FROM todolist WHERE list_title = $1",
          [listTitle]
        );
        items_tmp[listTitle] = lists.rows;
      })
    );
    return items_tmp;
  } catch (err) {
    console.log(err);
  }
}
app.get("/", async (req, res) => {
  try {
    items = await getItems();
  } catch (err) {
    console.log(err);
  }
  res.render("index.ejs", {
    listTitles: listTitles,
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body;
  try {
    await db.query("INSERT INTO todolist (title, list_title) VALUES ($1, $2)", [
      item.newItem,
      item.list,
    ]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
  console.log(item);
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
