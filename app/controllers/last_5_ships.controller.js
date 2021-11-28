const last_5_ships = require("../models/last_5_ships.model");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  // console.log(req);

    last_5_ships.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};
