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

/* GET users listing. */
router.get("/:associatedAccount", function (req, res, next) {
  console.log("notifcation router entered!");
  var account = req.params.associatedAccount;
  res.send([
    {
      processingDate: "2019-11-01T05:00:00.000Z",
      type: "balanceBelow",
      description: "You're out of money dawg.",
    },
  ]);
});

module.exports = router;
