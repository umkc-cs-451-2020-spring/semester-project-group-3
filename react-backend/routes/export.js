var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config");
var bodyParser = require("body-parser");
const fastcsv = require("fast-csv");
const fs = require("fs");

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

/* GET users listing. */
router.get("/:associatedAccount", function(req, res, next) {
  var account = req.params.associatedAccount;

  if (!account) {
    console.log("associatedAccount not defined");
    res.send("associatedAccount not defined");
  } else {
    connection.getConnection(function(err, connection) {
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query(
        "select * from Transaction where associatedAccount =" + account,
        function(error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          const jsonData = JSON.parse(JSON.stringify(results));
          console.log("jsonData", jsonData);
          const ws = fs.createWriteStream("transactions_fastcsv.csv");

          fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
              res.send("Exported transactions to transactions_fastcsv.csv successfully!");
            })
            .pipe(ws);
        }
      );
    });
  }
});

router.get("/:associatedAccount/:otherColumns", function(req, res, next) {
  var account = req.params.associatedAccount;
  console.log("method:" + req.method);
  console.log("otherCol: " + req.params.otherColumns);
  var otherColumns = JSON.parse(req.params.otherColumns);

  var conditions = "";

  if (otherColumns.type != undefined) {
    console.log("TYPE FOUND");
    var type = otherColumns.type;
    conditions += "and type = '" + type + "'\n";
  } else {
    console.log("TYPE NOT FOUND");
  }

  if (!account) {
    console.log("associatedAccount not defined");
    res.send("associatedAccount not defined");
  } else {
    connection.getConnection(function(err, connection) {
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query(
        "select * from Transaction where associatedAccount = " +
          account +
          "\n" +
          conditions +
          ";",
        function(error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          const jsonData = JSON.parse(JSON.stringify(results));
          console.log("jsonData", jsonData);

          fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
              res.send("Exported transactions to transactions_fastcsv.csv successfully!");
            })
            .pipe(ws);
        }
      );
    });
  }
});

module.exports = router;
