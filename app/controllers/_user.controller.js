const user = require("../models/_user.model.js");
const User_model = require("../models/_user.model.js");

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

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const user = new User_model({
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        password: req.body.password,
        rule: req.body.rule,
        email: req.body.email,
        date_time_created: datetime
    });
  
    // Save user in the database
    User_model.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.send(data);
    });
};

exports.user_check = (req, res) => {

  user.check(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Nao encontrada.`
        });
      } else {
        res.status(500).send({
          message: "Erro na solicitação" + req.body
        });
      }
    } else res.send(data);
  });
};


