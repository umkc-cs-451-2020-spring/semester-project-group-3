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

class NotificationHandler {
  constructor(accountID) {
    this.conn = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });
    this.accountID = this.conn.escape(accountID);
  }

  async getNewNotifications() {
    const conn = this.conn;

    console.log("getNewNotifications entered...");
    var newNotifications = [];
    //https://codeburst.io/2-async-functions-in-javascript-async-await-a905d5aae73c

    const lastNotificationCheck = await this.getLastNotificationCheck();

    console.log("this is last...");
    console.log(lastNotificationCheck);

    const getTransactionsQuery = "";

    const getNotificationTriggersQuery = "";

    return newNotifications;
  }

  async getLastNotificationCheck() {
    const conn = this.conn;
    const getLastNotificationCheckQuery = `select lastNotificationCheck from Account where accountID = ${this.accountID};`;

    conn.getConnection(function (err, conn) {
      console.log("Connection entered");
      conn.query(getLastNotificationCheckQuery, function (
        error,
        results,
        fields
      ) {
        // If some error occurs, we throw an error.
        if (error) throw error;
        var x = results[0];
        console.log("this is x...");
        console.log(x);
        return results[0];
      });
    });
  }

  archiveNotifications(notifications) {}
}

/* GET users listing. */
router.get("/:associatedAccount", function (req, res, next) {
  var account = req.params.associatedAccount;
  var handler = new NotificationHandler(account);
  handler.getNewNotifications();

  res.send([
    {
      processingDate: "2019-11-01T05:00:00.000Z",
      type: "balanceBelow",
      description: "You're out of money dawg.",
    },
  ]);
});

module.exports = router;
