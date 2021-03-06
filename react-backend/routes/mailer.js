var nodemailer = require('nodemailer');
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
    console.log("EMAIL:" + req.query.email);
    var email = req.query.email;

    query =
      "select count(*) from Account where email = " +
      connection.escape(email) + ";";
  
    query_2 =
      "select cast(AES_DECRYPT(password, '" + config.password + "') as char) as pass from Account where email = " +
      connection.escape(email) + ";";

    connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      var count = results[0]["count(*)"];
      if(count > 0) {
        connection.query(query_2, function(error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;

            console.log(results);

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: config.email,
                pass: config.password
              }
            });

            var mailOptions = {
                from: config.email,
                to: email,
                subject: 'Recover password, Commerce Bank',
                text: 'Here is your recovered password: ' + results[0]["pass"]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.send(error.response)
                } else {
                    res.send("Email was successfully sent to " + email + " !");
                }
            });
         });
        } else {
            res.send("Account was not found...")
        }
        });
    }); 
});

module.exports = router;