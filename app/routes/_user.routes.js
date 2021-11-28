module.exports = app => {
    const user = require("../controllers/_user.controller.js");
  
    // Create a new Customer
    app.post("/user_create", user.create);

    //rota para buscar uma fazenda pelo id
    app.post("/user_check", user.user_check)
  
};