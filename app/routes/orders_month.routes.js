module.exports = app => {

    const orders_month = require("../controllers/orders_month.controller.js");
  
    app.post("/orders_month", orders_month.findAll);
  
  };
  