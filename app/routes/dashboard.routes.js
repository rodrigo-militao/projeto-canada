module.exports = app => {
const dashboard = require("../controllers/dashboard.controller.js");
  
app.post("/dashboard", dashboard.findAll);

};
