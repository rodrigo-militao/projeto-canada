const sql = require("./db.js");

// constructor
const user = function(user) {
  this.customer_id = user.customer_id;
  this.customer_name = user.customer_name;
  this.password = user.password;
  this.rule = user.rule;
  this.date_time_created = user.date_time_created;
};

user.create = (newuser, result) => {
  sql.query("INSERT INTO db_shipping_cali.tbl_register SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newuser });
    result(null, { id: res.insertId, ...newuser });
  });
};


module.exports = user;
