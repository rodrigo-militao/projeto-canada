// const sql = require("./db.js");
// const api = require("./api.js");
const axios = require('axios')
var request = require('request');
const fetch = require('node-fetch')


// constructor
const last_5_ships = function (last_5_ships) {
  this.id = last_5_ships.id;
};

last_5_ships.findById = async (req) => {

  const querys = [
    `SELECT top 5 ds_pronum, ds_bill_date, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status  FROM dba.disp_ship ${req.body.id != "Admin" ? `where ds_billto_id = ${req.body.id}` : ""} ORDER BY ds_bill_date DESC`   
  ]

  let array_results = []
  let index = 0
  for (const query in querys) {
   
    const json = querys[query].toString()
    const options = {
      method: 'POST',
      url: 'https://connect.blackfly.dev/execute_sql/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsib3JnYW5pemF0aW9uX2tleSI6InRyYW5zcG9ydF9kX3NxdWFyZWQifSwiaWF0IjoxNjE0Nzk0ODY1LCJzY29wZSI6ImV4ZWN1dGVfc3FsIHJlYWQ6aW1hZ2VzIHdyaXRlOmltYWdlcyJ9.RqH4kpAhNoyi1Tjzg1VZ-kt4CW8xE_nzDeJ5GnmpNk0'
      },
      body: JSON.stringify({
        sql: json
      }),
    };

    const req = await fetch(options.url, options)
    const data = await req.json()

    array_results.push(data.length > 1 ? data : data[0])
    
  }

  return array_results
  
};

module.exports = last_5_ships;