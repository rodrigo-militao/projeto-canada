const adminData = require("../models/admin_page.model");

exports.findAll = async (req, res) => {
  
  try {
    const adminres = await adminData.findById(req);
    const response = {
      "ships_open": adminres[0],
      "ship_customer": adminres[1]
    }
  
    res.send(response);
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving admin page."
    });
  }
};