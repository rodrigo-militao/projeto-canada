// const sql = require("./db.js");
// const api = require("./api.js");
const axios = require('axios')
var request = require('request');

const Shipments = function (shipments) {
  this.id = shipments.id;
};

Shipments.findById = (shipments, result) => {

  const querys = [
    `SELECT ds_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, (SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC) AS del_date, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_origin_id) AS Origin, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_findest_id) AS Desti, (SELECT top 1 de_site FROM [DBA].disp_events WHERE de_shipment_id = ds_id ORDER BY de_ship_seq DESC) AS RetLocId, (SELECT co_name FROM [DBA].companies WHERE co_id = RetLocId) AS RetLoc, etadate, (SELECT top 1 lease_ftxdate FROM [DBA].[outside_ship_lease] where [outside_ship_lease].ds_id = [disp_ship].ds_id) AS last_free_date, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status, (CASE WHEN movecode = 'I' THEN 'IMPORT' WHEN movecode = 'E' THEN 'EXPORT' WHEN movecode = 'O' THEN 'ONEWAY' ELSE 'NOT FOUND' END) AS ship_type, ds_bill_charge FROM [DBA].disp_ship WHERE (YEAR(del_date) = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${shipments.body.id} ORDER BY del_date ASC`//,
    //`SELECT ds_billto_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, sum(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE YEAR(delbydate) = YEAR(GETDATE()) AND ds_status IN('K','N','Q','T','W') GROUP BY ds_billto_id,Customer ORDER BY total_amount DESC`
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
      if (index == 1){result(null, array_results);}
    });
  }
};

module.exports = Shipments;
