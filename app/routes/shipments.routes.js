module.exports = app => {

    const shipments = require("../controllers/shipments.controller.js");
  
    app.post("/shipments", shipments.findAll);
  
  };
  