const avg_amount = require("../models/avg_amount.model");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  // console.log(req);

    avg_amount.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};
