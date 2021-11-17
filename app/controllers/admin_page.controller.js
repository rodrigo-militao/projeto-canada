const adminData = require("../models/admin_page.model");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  // console.log(req);

  adminData.findById(req, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
    
  });
};