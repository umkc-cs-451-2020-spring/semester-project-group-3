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

  //Gets, sends, and archives notifications generated after last check and then updates last check to now
  getNewNotifications() {
    let self = this;
    const conn = this.conn;

    var newNotifications = [];

    const getLastNotificationCheckQuery = `select date_format(lastNotificationCheck, ${self.dateTimeFormat}) as lastNotificationCheck from Account where accountID = ${self.accountID};`;
    const getNotificationTriggersQuery = `
    select NotificationTrigger.type, amount, value, NotificationTriggerDescription.description from NotificationTrigger
    inner join NotificationTriggerDescription on NotificationTrigger.type = NotificationTriggerDescription.type
    where active = true and associatedAccount = ${self.accountID} and startDate < current_timestamp;
    `;
    const multiQuery =
      getLastNotificationCheckQuery + getNotificationTriggersQuery;

    conn.getConnection(function (err, conn) {
      conn.query(multiQuery, function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

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
          self.updateLastNotificationCheckToNow();
          return newNotifications;
        });
      });
    });

    return newNotifications;
  }

  //generate list of notifications from given lists of transactions and triggers
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
                amount,
                value
              )
            );
          });

          break;
        case "transactionAmountAbove":
          var amountAboveTransactions = this.getIfAmountAbove(
            transactions,
            amount
          );
          amountAboveTransactions.forEach((transaction) => {
            notifications.push(
              this.createNotification(
                transaction["processingDate"],
                type,
                description,
                amount,
                value
              )
            );
          });
          break;

        case "descriptionContains":
          var descriptionContainsTransactions = this.getIfDescriptionContains(
            transactions,
            value
          );
          descriptionContainsTransactions.forEach((transaction) => {
            notifications.push(
              this.createNotification(
                transaction["processingDate"],
                type,
                description,
                amount,
                value
              )
            );
          });

          break;

        case "recurringDescription":
          //TODO: figure out a way to develop this without comparing every transaction every time

          break;
        default:
          console.log("Type Unrecognized..." + type);
      }
    });
    return notifications;
  }

  //get notification object with amount and value params inserted into the description
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

  //get transactions whose historic balance falls below a specified amount
  getIfBalanceBelow(transactions, minBalance) {
    var guiltyTransactions = [];
    transactions.forEach((transaction, idx, array) => {
      if (transaction["historicBalance"] <= minBalance) {
        guiltyTransactions.push(transaction);
      }
    });
    return guiltyTransactions;
  }

  //get transactions whose amount goes above a specified amount
  getIfAmountAbove(transactions, maxAmount) {
    var guiltyTransactions = [];
    transactions.forEach((transaction, idx, array) => {
      if (transaction["amount"] >= maxAmount) {
        guiltyTransactions.push(transaction);
      }
    });
    return guiltyTransactions;
  }

  //get transactions whose description contains a specified value
  getIfDescriptionContains(transactions, value) {
    var guiltyTransactions = [];
    var value = value.toLowerCase();
    transactions.forEach((transaction, idx, array) => {
      var description = transaction["description"].toLowerCase();

      if (description.includes(value)) {
        guiltyTransactions.push(transaction);
      }
    });
    return guiltyTransactions;
  }

  //write given list of notifications to the database for long-term keeping
  archiveNotifications(notifications) {
    const conn = this.conn;

    var multiQuery = "";

    notifications.forEach((notification) => {
      multiQuery += this.buildArchiveQuery(notification);
    });

    if (multiQuery != "") {
      conn.getConnection(function (err, conn) {
        conn.query(multiQuery, function (error, results, fields) {});
      });
    }
  }

  //build insert query for given notification object
  buildArchiveQuery(notification) {
    var archiveNotificationsQuery =
      "insert into Notification(associatedAccount, type, processingDate, description) values(";
    return (
      archiveNotificationsQuery +
      this.accountID +
      ",'" +
      notification["type"] +
      "','" +
      notification["processingDate"] +
      "','" +
      notification["description"] +
      "');"
    );
  }

  //update last notification check field to now in the database
  updateLastNotificationCheckToNow() {
    const conn = this.conn;

    var updateLastNotificationCheckQuery =
      "update Account set lastNotificationCheck = current_timestamp where accountID = " +
      this.accountID +
      ";";

    conn.getConnection(function (err, conn) {
      conn.query(updateLastNotificationCheckQuery, function (
        error,
        results,
        fields
      ) {});
    });
  }
}

router.get("/:associatedAccount", function (req, res, next) {
  var account = req.params.associatedAccount;
  var handler = new NotificationHandler(account, res);
  handler.getNewNotifications();
});

module.exports = router;
