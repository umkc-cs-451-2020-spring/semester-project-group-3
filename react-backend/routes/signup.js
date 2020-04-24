var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config");
var bodyParser = require("body-parser");

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

router.post("/", function (req, res, next) {
  var accountID = req.query.accountID;
  var email = req.query.email;
  var password = req.query.password;

  const existingAccountQuery =
    "insert into Account (accountID, email, password, balance) " +
    "values (" +
    connection.escape(accountID) +
    ", " +
    connection.escape(email) +
    ", AES_ENCRYPT(" +
    connection.escape(password) +
    ", '" +
    config.password +
    "'), 0);";

  const newAccountQuery =
    "insert into Account (email, password, balance) " +
    "values (" +
    connection.escape(email) +
    ", AES_ENCRYPT(" +
    connection.escape(password) +
    ", '" +
    config.password +
    "'), 0);";

  const getAccountIDQuery =
    "select accountID from Account where email = " +
    connection.escape(email) +
    ";";

  connection.getConnection(function (err, connection) {
    if (accountID == undefined) {
      connection.query(newAccountQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        connection.query(getAccountIDQuery, function (error, results, fields) {
          if (error) throw error;

          console.log(results);
          console.log(results[0]);
          console.log(results[0]["accountID"]);
          res.send(results[0]["accountID"].toString());
        });
      });
    } else {
      connection.query(existingAccountQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        res.send(accountID.toString());
      });
    }
  });
});

module.exports = router;
