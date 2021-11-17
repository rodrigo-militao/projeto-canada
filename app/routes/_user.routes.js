module.exports = app => {
    const user = require("../controllers/_user.controller.js");
  
   // Create a new Customer
  app.post("/user_create", user.create);
  
};