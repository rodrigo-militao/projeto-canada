// const sql = require("./db.js");
// const api = require("./api.js");
const axios = require('axios')
var request = require('request');

const Monthly_amount = function (monthly_amount) {
  this.id = monthly_amount.id;
};

Monthly_amount.findById = (monthly_amount, result) => {

  const querys = [
    `SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${monthly_amount.body.id} GROUP BY year_del_date, month_del_date ORDER BY month_del_date ASC`,
    `SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id <> ${monthly_amount.body.id} GROUP BY year_del_date, month_del_date ORDER BY month_del_date ASC`
    //`SELECT AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (YEAR(delbydate) = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id <> ${monthly_amount.body.id}` 
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
      if (index == 2){result(null, array_results);}
    });
  }
};

module.exports = Monthly_amount;
