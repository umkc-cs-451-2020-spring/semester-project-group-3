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
  var accountID = req.query.accountID;
  var email = req.query.email;
  var password = req.query.password;
  
  query =
    "insert into Account (accountID, email, password, balance) " + 
    "values (" + connection.escape(accountID) + ", " + connection.escape(email) + 
    ", AES_ENCRYPT(" + connection.escape(password) + ", '" + config.password + "'), 0);";

  connection.getConnection(function(err, connection) {
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      res.send("Successfully created a new account!");
    });
  });
});

module.exports = router;
