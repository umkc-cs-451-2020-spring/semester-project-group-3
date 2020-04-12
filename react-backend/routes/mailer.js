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

var mailOptions = {
  from: 'Group3Commerce2020@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Recover password, Commerce Bank',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});