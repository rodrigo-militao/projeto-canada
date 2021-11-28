module.exports = app => {

    const monthly_amount = require("../controllers/monthly_amount.controller.js");
  
    app.post("/monthly_amount", monthly_amount.findAll);
  
  };
  