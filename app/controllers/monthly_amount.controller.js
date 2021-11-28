const Monthly_amount = require("../models/monthly_amount.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    
  Monthly_amount.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};
