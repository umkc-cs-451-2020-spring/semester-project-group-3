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
  var associatedAccount = req.query.account;
  var type = req.query.type;
  var amount = req.query.amount;
  var startDate = req.query.startDate;
  var description = req.query.description;

  if (startDate == undefined) {
    startDate = null;
  } else {
    startDate = "'" + startDate + "'";
  }

  query =
    "call createNotificationTrigger('" +
    associatedAccount +
    "','" +
    type +
    "'," +
    amount +
    "," +
    startDate +
    ",'" +
    description +
    "');";

  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Successfully created trigger!");
      res.send(true);
    });
  });
});

router.get("/:associatedAccount", function(req, res, next) {
  var account = req.params.associatedAccount;
  console.log("method:" + req.method);
  console.log("body:" + account);
  if (!account) {
    console.log("associatedAccount not defined");
    res.send("associatedAccount not defined");
  } else {
    connection.getConnection(function(err, connection) {
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query(
        "select * from NotificationTrigger where associatedAccount =" + account,
        function(error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.send(results);
        }
      );
    });
  }
});

router.post("/delete/", function(req, res, next) {
  var notificationTriggerID = req.query.notificationTriggerID;

  query =
    "delete from NotificationTrigger where notificationTriggerID = " +
    notificationTriggerID +
    ";";

  connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Successfully deleted trigger!");
      res.send(true);
    });
  });
});

module.exports = router;
