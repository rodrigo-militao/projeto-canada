const shipments = require("../models/shipments.model.js");

// Retrieve all Customers from the database.
exports.findAll = async (req, res) => {
  try {
    const response = await shipments.findById(req);

    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving shipments."
    });
  }
};
