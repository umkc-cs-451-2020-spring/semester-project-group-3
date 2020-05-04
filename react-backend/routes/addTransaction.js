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
    var type = req.query.type;
    var amount = req.query.amount;
    var description = req.query.description;

    query = 
    "call setTransaction(" + connection.escape(accountID) + ", now(), " + 
    connection.escape(type) + ", " + connection.escape(amount) + ", " +
    connection.escape(description) + ");"

    connection.getConnection(function(err, connection) {
        // Executing the MySQL query (select all data from the 'users' table).
        connection.query(query, function(error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) res.send(error);

          res.send("Transaction was successfully added!")
        });
    });
});
module.exports = router;