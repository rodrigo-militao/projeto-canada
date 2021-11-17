module.exports = app => {
    const admin_page = require("../controllers/admin_page.controller.js");
  
    app.post("/admin_page", admin_page.findAll);
  
  };