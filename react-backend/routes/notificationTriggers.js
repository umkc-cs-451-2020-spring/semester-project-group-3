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
  multipleStatements: true,
});

function isJson(str) {
  console.log("parsing this string " +  str);
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

router.post("/", function (req, res, next) {
  var triggers = req.query.triggers;
  console.log("inside post triggers str=" +triggers);
  if (isJson(triggers)) {
    triggers = JSON.parse(triggers);
  }

  console.log("after parse triggers = "+ triggers);

  var multiCreateQuery = "";
  triggers.forEach((trigger, idx, array) => {
    console.log("foreach loop trigger=" + trigger);
    var associatedAccount = trigger.account;

    if (associatedAccount == undefined) {
      return true; // acts as a continue statement
    }

    var type = trigger.type;
    var amount = trigger.amount;
    var value = trigger.value;
    var startDate = trigger.startDate;

    // convert undefined to null

    if (amount == undefined) {
      amount = null;
    }

    if (value == undefined) {
      value = null;
    }

    if (startDate == undefined) {
      startDate = null;
    }
    console.log("inside post: acount" + associatedAccount + " type: "+ type +
                " amount:" + amount + " value:" + value + " startDate:" + startDate);

    var query =
      "call createNotificationTrigger(" +
      connection.escape(associatedAccount) +
      "," +
      connection.escape(type) +
      "," +
      connection.escape(amount) +
      "," +
      connection.escape(value) +
      "," +
      connection.escape(startDate) +
      ");";

    multiCreateQuery += query;
  });

  if (multiCreateQuery != "") {
    console.log("multiCreateQuery: " + multiCreateQuery);
    connection.getConnection(function (err, connection) {
      connection.query(multiCreateQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        console.log("Successfully created triggers!");
        res.send(true);
      });
    });
  } else {
    console.log("No triggers to create!");
    res.send(false);
  }
});

router.get("/:associatedAccount", function (req, res, next) {
  var account = req.params.associatedAccount;
  console.log("method:" + req.method);
  console.log("body:" + account);
  if (!account) {
    console.log("associatedAccount not defined");
    res.send("associatedAccount not defined");
  } else {
    connection.getConnection(function (err, connection) {
      connection.query(
        "select * from NotificationTrigger where associatedAccount =" + account,
        function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          // Getting the 'response' from the database and sending it to our route. This is were the data is.
          res.send(results);
        }
      );
    });
  }
});

router.post("/delete", function(req, res, next) {
  var notificationTriggerID = req.query.notificationTriggerID;

  query =
    "delete from NotificationTrigger where notificationTriggerID = " +
    notificationTriggerID +
    ";";

  connection.getConnection(function (err, connection) {
    connection.query(query, function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      console.log("Successfully deleted trigger!");
      res.send(true);
    });
  });
});

router.post("/update/", function (req, res, next) {
  var triggersToUpdate = req.query.triggers;

  if (isJson(triggersToUpdate)) {
    triggersToUpdate = JSON.parse(triggersToUpdate);
  }

  console.log(triggersToUpdate);

  var multiUpdateQuery = "";
  triggersToUpdate.forEach((trigger, idx, array) => {
    var notificationTriggerID = trigger["notificationTriggerID"];

    if (notificationTriggerID == undefined) {
      return true; // acts as a continue statement
    }

    var type = trigger["type"];
    var active = trigger["active"];
    var amount = trigger["amount"];
    var value = trigger["value"];
    var startDate = trigger["startDate"];

    var query = "update NotificationTrigger set ";

    if (type != undefined) {
      type = connection.escape(type);
      query += `type = ${type}, `;
    }

    if (active != undefined) {
      query += `active = ${active}, `;
    }

    if (startDate != undefined) {
      startDate = connection.escape(startDate);
      query += `startDate = ${startDate}, `;
    }

    // convert undefined to null
    if (amount == undefined) {
      amount = null;
    } else {
      amount = connection.escape(amount);
    }
    query += `amount = ${amount}, `;

    if (value == undefined) {
      value = null;
    } else {
      value = connection.escape(value);
    }
    query += `value = ${value} `;

    query += `where notificationTriggerID = ${notificationTriggerID};`;

    multiUpdateQuery += query;
  });

  if (multiUpdateQuery != "") {
    connection.getConnection(function (err, connection) {
      connection.query(multiUpdateQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        console.log("Successfully applied update to triggers!");
        res.send(true);
      });
    });
  } else {
    console.log("No triggers to update!");
    res.send(false);
  }
});

module.exports = router;
