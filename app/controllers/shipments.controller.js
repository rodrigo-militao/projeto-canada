const shipments = require("../models/shipments.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    
    shipments.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};
