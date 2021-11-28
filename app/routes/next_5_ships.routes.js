module.exports = app => {
    const next_5_ships = require("../controllers/next_5_ships.controller.js");
  
    app.post("/next_5_ships", next_5_ships.findAll);
  
  };