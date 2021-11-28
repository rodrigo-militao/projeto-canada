module.exports = app => {
    const logs = require("../controllers/_logs.controller.js");
  
   // Create a new Customer
  app.post("/logs_create", logs.create);
  
};