// const sql = require("./db.js");
// const api = require("./api.js");
const axios = require('axios')
var request = require('request');


// constructor
const AdminData = function (AdminData) {
  this.id = AdminData.id;
};

AdminData.findById = (AdminData, result) => {

  const querys = [
    `SELECT ds_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_origin_id) AS Origin, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_findest_id) AS Desti, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status  FROM [DBA].disp_ship WHERE ds_status IN('K','N','Q','T') ORDER BY ds_id ASC`,
    `SELECT (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, sum(ds_bill_charge) AS total_amount, count(ds_id) AS qty_tmps FROM [DBA].disp_ship WHERE ds_status IN('K','N','Q','T') GROUP BY Customer ORDER BY total_amount DESC`,
  ]

  let array_results = []
  let index = 0
  for (const query in querys) {
   
    const json = querys[query].toString()
    const options = {
      method: 'POST',
      url: 'https://connect.blackfly.dev/execute_sql/',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsib3JnYW5pemF0aW9uX2tleSI6InRyYW5zcG9ydF9kX3NxdWFyZWQifSwiaWF0IjoxNjE0Nzk0ODY1LCJzY29wZSI6ImV4ZWN1dGVfc3FsIHJlYWQ6aW1hZ2VzIHdyaXRlOmltYWdlcyJ9.RqH4kpAhNoyi1Tjzg1VZ-kt4CW8xE_nzDeJ5GnmpNk0'
      },
      body: {
        sql: json
      },
      json: true
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);    
      array_results[index] = body
      index++;
      console.log(body)
      if (index == 3){result(null, array_results);}
    });
    
  }
  
};

module.exports = AdminData;
