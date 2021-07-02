const mysql = require("mysql");
const config = require("./config");

const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});
db.connect((err) => {
  if (err) throw err;
  console.log(`Databese connected`);
});

module.exports = db;
