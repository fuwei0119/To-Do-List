import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "769212548o",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];


app.get("/", async (req, res) => {
  try {
    const todayItems = await db.query("SELECT id, title FROM items WHERE type = 'Today'");
    const weekItems = await db.query("SELECT id, title FROM items WHERE type = 'Week'");
    const monthItems = await db.query("SELECT id, title FROM items WHERE type = 'Month'");
    
    res.render("index.ejs", {
      boxes: [
        { title: "Today", items: todayItems.rows },
        { title: "Week", items: weekItems.rows },
        { title: "Month", items: monthItems.rows }
      ]
    });
  } catch (error) {
    console.log(err);
  }
});


app.post("/add", async(req, res) => {
  const title = req.body.newItem;
  const type = req.body.list;
  try {
    const result = await db.query("INSERT INTO items(title,type) VALUES($1, $2)", [title, type]);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding new item:", error);
    res.status(500).send("Error adding new item.");
  }
  
});

app.post("/edit", async(req, res) => {
  const findId = req.body.updatedItemId;
  const updatedTitle = req.body.updatedItemTitle; 
  try {
    const title = await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedTitle, findId]);
  } catch (error) {
    console.log(err);
  }
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  const findId = req.body.deleteItemId;
  try {
    const result = await db.query("DELETE FROM items WHERE id = $1", [findId]);
  } catch (error) {
    console.log(err);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
