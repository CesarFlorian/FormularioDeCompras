const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");

require("./database/db");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secreto_seguro",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

const router = require("./routes/router");
app.use("/", router);

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
