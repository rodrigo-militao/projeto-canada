module.exports = app => {
    const contacts = require("../controllers/contacts.controller.js");
  
    app.post("/contacts", contacts.findAll);
  
  };