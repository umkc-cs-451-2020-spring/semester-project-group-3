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
  var value = req.query.value;
  var startDate = req.query.startDate;
  var description = req.query.description;

  // convert undefined to null

  if (amount == undefined) {
    amount = null;
  }

  if (value == undefined) {
    value = null;
  } else {
    value = "'" + value + "'";
  }

  if (startDate == undefined) {
    startDate = null;
  } else {
    startDate = "'" + startDate + "'";
  }

  // build query
  query =
    "call createNotificationTrigger('" +
    connection.escape(associatedAccount) +
    "','" +
    connection.escape(type) +
    "'," +
    connection.escape(amount) +
    "," +
    connection.escape(value) +
    "," +
    connection.escape(startDate) +
    ",'" +
    connection.escape(description) +
    "');";

  connection.getConnection(function(err, connection) {
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
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Successfully deleted trigger!");
      res.send(true);
    });
  });
});

module.exports = router;
