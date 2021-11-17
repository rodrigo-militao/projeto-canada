module.exports = app => {
    const avg_amount = require("../controllers/avg_amount.controller.js");
  
    app.post("/avg_amount", avg_amount.findAll);
  
  };
  
   