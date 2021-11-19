const logs = require("../models/_logs.model.js");
const Logs_model = require("../models/_logs.model.js");


// Show the datetime, date or time now
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var date_now = year + "-" + month + "-" + date;
var hour_now =  hours + ":" + minutes + ":" + seconds;
var datetime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;


// Create and Save a new logs
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a logs
    const logs = new Logs_model({
        customer_id: req.body.customer_id,
        date_time_login: datetime
    });
  
    // Save logs in the database
    Logs_model.create(logs, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the logs."
        });
      else res.send(data);
    });
  };