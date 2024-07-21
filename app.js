const express = require("express");
const exhbps = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const path = require("path");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get("/*", (req, res) => {
  res.render(path.join(__dirname, "views", "404.hbs"));
  res.status(404);
});
