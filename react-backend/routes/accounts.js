var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("./config");
var bodyParser = require("body-parser");

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query("SELECT * FROM Account", function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

module.exports = router;
