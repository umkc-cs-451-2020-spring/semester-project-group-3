var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config");
var bodyParser = require("body-parser");

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

router.post("/", function(req, res, next) {
  console.log("EMAIL:" + req.query.email);
  var email = req.query.email;
  var password = req.query.password;
  query =
    "select count(*) from Account where email = '" +
    email +
    "' and password = '" +
    password +
    "';";

  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Login Resp:" + results[0]["count(*)"]);
      //   res.send(results);
      var count = results[0]["count(*)"];

      if (count > 0) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });
});

module.exports = router;