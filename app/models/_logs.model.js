const sql = require("./db.js");

// constructor
const logs = function(logs) {
  this.customer_id = logs.customer_id;
  this.customer_name = logs.customer_name;
  
};

logs.create = (newlogs, result) => {
  sql.query("INSERT INTO db_shipping_cali.tbl_log_login SET ?", newlogs, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created logs: ", { id: res.insertId, ...newlogs });
    result(null, { id: res.insertId, ...newlogs });
  });
};


module.exports = logs;
