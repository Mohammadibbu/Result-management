const express = require("express");
const exhbps = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mysql
const conn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_host,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//static
app.use(express.static("public"));

//port listening
app.listen(port, () => console.log(` app listening on port ${port}!`));

//template engine
const handlebars = exhbps.create({
  extname: ".hbs",
  helpers: {
    indexVal: (index) => {
      return index + 1;
    },
  },
  registerPartials: path.join(__dirname, "./views/partials"),
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

//router
const routes = require("./server/routes/router");
app.use("/", routes);

///////////
app.get("/*", (req, res) => {
  res.render(path.join(__dirname, "views", "404.hbs"));
  res.status(404);
});

// Route to handle form submission and query results
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
app.post("/get-results", (req, res) => {
  const registerNumber = req.body.regno;
  const dob = req.body.dob;

  // SQL query to get the results for the given register number
  const sql = `SELECT * FROM Results WHERE register_number = ?`;
  // SQL query to get the student's name
  const SQL_for_GetName = `SELECT student_name,Dob FROM Students WHERE register_number = ?`;

  conn.query(sql, [registerNumber], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error fetching results");
    }

    // Check if results are found
    if (results.length === 0) {
      return res.status(404).send("No results found for the given details");
    }

    // Fetch student name after results are found
    conn.query(SQL_for_GetName, [registerNumber], (err, nameResult) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Error fetching student name");
      }

      // Render a result page with the queried results and student name
      res.render(path.join(__dirname, "./views/results/resultPage"), {
        studentName: nameResult[0].student_name,
        DOB: formatDate(nameResult[0].Dob),
        data: results,
      });
      console.log("Results:", results);
    });
  });
});
