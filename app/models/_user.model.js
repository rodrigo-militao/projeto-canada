const sql = require("./db.js");

// constructor
const User = function(user) {
  this.customer_id = user.customer_id;
  this.customer_name = user.customer_name;
  this.password = user.password;
  this.rule = user.rule;
  this.email = user.email;
  this.date_time_created = user.date_time_created;
};

User.create = (newuser, result) => {
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

User.check = (data, result) => {
  sql.query(`select customer_id, email, customer_name, rule from db_shipping_cali.tbl_register where email = ? and password = ?;`, [data.email, data.password] , (err, res) => {
    //se ocorrer um erro
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //se a busca suceder
    if (res.length) {
      console.log("Succeded!", res);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);

  });
};

module.exports = User;
