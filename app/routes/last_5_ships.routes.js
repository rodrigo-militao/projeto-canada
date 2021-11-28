module.exports = app => {
    const last_5_ships = require("../controllers/last_5_ships.controller.js");
  
    app.post("/last_5_ships", last_5_ships.findAll);
  
  };