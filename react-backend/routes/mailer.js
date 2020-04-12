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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Group3Commerce2020@gmail.com',
    pass: 'Gr0up3!2020'
  }
});

router.post("/", function(req, res, next) {
    console.log("EMAIL:" + req.query.email);
    var email = req.query.email;

    query =
      "select count(*) from Account where email = " +
      connection.escape(email) + ";";
  
    query_2 =
      "select AES_DECRYPT(password, '" + config.password + "')(CHAR) from Account where email = " +
      connection.escape(email) + ";";

    connection.getConnection(function(err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(query, function(error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      if(results[0] > 0) {
        connection.query(query2, function(error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;

            var mailOptions = {
                from: 'Group3Commerce2020@gmail.com',
                to: connection.escape(email),
                subject: 'Recover password, Commerce Bank',
                text: 'Here is your recovered password: ' + results[0]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
         });
        } else {
            res.send("Account was not found...")
        }
        });
    }); 
});