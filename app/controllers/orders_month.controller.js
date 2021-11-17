const orders_month = require("../models/orders_month.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    
    orders_month.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};
