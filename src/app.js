const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database");

const sesion = require("express-session");
const snackRoutes = require("./routes/routes");

app.set("port", 3001);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  sesion({
    secret: "sectret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("Api rest meriendas");
});

app.use("/api", snackRoutes);

module.exports = app;
