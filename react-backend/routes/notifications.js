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

class NotificationHandler {
  constructor(accountID, res) {
    this.conn = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    });
    this.accountID = this.conn.escape(accountID);
    this.dateTimeFormat = "'%Y-%m-%d %T'";
    this.res = res;
  }

  getNewNotifications() {
    let self = this;
    const conn = this.conn;

    console.log("getNewNotifications entered...");
    var newNotifications = [];

    const getLastNotificationCheckQuery = `select date_format(lastNotificationCheck, ${self.dateTimeFormat}) as lastNotificationCheck from Account where accountID = ${self.accountID};`;
    const getNotificationTriggersQuery = `select type, amount, value, description from NotificationTrigger where active = true and associatedAccount = ${self.accountID} and startDate < current_timestamp;`;
    const multiQuery =
      getLastNotificationCheckQuery + getNotificationTriggersQuery;

    conn.getConnection(function (err, conn) {
      conn.query(multiQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        console.log("\nRESPONSE:");
        console.log(results);
        var lastNotificationCheck = results[0][0]["lastNotificationCheck"];

        console.log("\nLast Notification Check: " + lastNotificationCheck);

        var notificationTriggers = [];
        const triggerColumnNames = ["type", "amount", "value", "description"];

        console.log("\nTriggers:");
        results[1].forEach((trigger, idx, array) => {
          notificationTriggers.push(trigger);
          console.log("\n" + idx + ":");
          triggerColumnNames.forEach((col_name) => {
            console.log(col_name + ": " + trigger[col_name]);
          });
        });

        var getTransactionsQuery =
          "select type, amount, description, historicBalance, date_format(processingDate, " +
          self.dateTimeFormat +
          ") as processingDate from Transaction where associatedAccount = " +
          self.accountID +
          " and processingDate > str_to_date('" +
          lastNotificationCheck +
          "'," +
          self.dateTimeFormat +
          ");";

        console.log("\nThen query: " + getTransactionsQuery);
        conn.query(getTransactionsQuery, function (error, results, fields) {
          // If some error occurs, we throw an error.
          if (error) throw error;

          var newTransactions = [];
          const transactionColumnNames = [
            "processingDate",
            "type",
            "amount",
            "description",
            "historicBalance",
          ];

          console.log("\nTransactions:");
          results.forEach((transaction, idx, array) => {
            newTransactions.push(transaction);
            console.log("\n" + idx + ":");
            transactionColumnNames.forEach((col_name) => {
              console.log(col_name + ": " + transaction[col_name]);
            });
          });

          var newNotifications = self.getNotificationsFromTransactions(
            newTransactions,
            notificationTriggers
          );
          self.res.send(newNotifications);
          self.archiveNotifications(newNotifications);
          return newNotifications;
        });
      });
    });

    return newNotifications;
  }

  getNotificationsFromTransactions(transactions, triggers) {
    var notifications = [];

    triggers.forEach((trigger) => {
      var type = trigger["type"];
      var amount = trigger["amount"];
      var value = trigger["value"];
      var description = trigger["description"];

      switch (type) {
        case "balanceBelow":
          var balanceBelowTransactions = this.getIfBalanceBelow(
            transactions,
            0.0
          );
          balanceBelowTransactions.forEach((transaction) => {
            notifications.push(
              this.createNotification(
                transaction["processingDate"],
                type,
                description,
                amount
              )
            );
          });

          break;
        default:
          console.log("Type Unrecognized..." + type);
      }
    });
    return notifications;
  }

  createNotification(
    processingDate,
    type,
    description,
    amount = "",
    value = ""
  ) {
    description = description.replace("${amount}", amount);
    description = description.replace("${value}", value);
    return {
      processingDate: processingDate,
      type: type,
      description: description,
    };
  }

  getIfBalanceBelow(transactions, minBalance) {
    var guiltyTransactions = [];
    transactions.forEach((transaction, idx, array) => {
      console.log(
        "Comparing " + transaction["historicBalance"] + " and " + minBalance
      );
      if (transaction["historicBalance"] <= minBalance) {
        guiltyTransactions.push(transaction);
      }
    });
    return guiltyTransactions;
  }

  archiveNotifications(notifications) {
    //TODO: archiveNotifications
  }
}

/* GET users listing. */
router.get("/:associatedAccount", function (req, res, next) {
  var account = req.params.associatedAccount;
  var handler = new NotificationHandler(account, res);
  handler.getNewNotifications();
});

module.exports = router;
