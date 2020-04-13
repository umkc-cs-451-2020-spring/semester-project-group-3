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
    "select count(*) from Account where email = " +
    connection.escape(email) +
    " and cast(AES_DECRYPT(password, '" + config.password + "') as char) = " +
    connection.escape(password) + 
    ";";

  query_2 =
    "select accountID from Account where email = " +
    connection.escape(email) +
    ";";

  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Login Resp:" + results[0]["count(*)"]);
      //   res.send(results);
      var count = results[0]["count(*)"];
      var ID = "";

      if (count > 0) {
        connection.query(query_2, function(error, results, fields) {
          if (error) throw error;

          console.log("account ID:" + results[0]["accountID"]);
          var ID = results[0]["accountID"];
          res.send({ isLoggedIn: true, accountID: ID });
        });
      } else {
        res.send({ isLoggedIn: false, accountID: ID });
      }
    });
  });
});

module.exports = router;
