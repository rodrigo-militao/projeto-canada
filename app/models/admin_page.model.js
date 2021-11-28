const fetch = require('node-fetch');

const AdminData = function (AdminData) {
  this.id = AdminData.id;
};

AdminData.findById = async (req) => {

  const querys = [
    `SELECT ds_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_origin_id) AS Origin, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_findest_id) AS Desti, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status  FROM [DBA].disp_ship WHERE ds_status IN('K','N','Q','T') ORDER BY ds_id ASC`,
    `SELECT (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, sum(ds_bill_charge) AS total_amount, count(ds_id) AS qty_tmps FROM [DBA].disp_ship WHERE ds_status IN('K','N','Q','T') GROUP BY Customer ORDER BY total_amount DESC`,
  ]

  let array_results = []
  for (const query in querys) {
   
    const json = querys[query].toString()
    const options = {
      method: 'POST',
      url: 'https://connect.blackfly.dev/execute_sql/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsib3JnYW5pemF0aW9uX2tleSI6InRyYW5zcG9ydF9kX3NxdWFyZWQifSwiaWF0IjoxNjE0Nzk0ODY1LCJzY29wZSI6ImV4ZWN1dGVfc3FsIHJlYWQ6aW1hZ2VzIHdyaXRlOmltYWdlcyJ9.RqH4kpAhNoyi1Tjzg1VZ-kt4CW8xE_nzDeJ5GnmpNk0'
      },
      body:  JSON.stringify({
        sql: json
      }),
      json: true
    };

    const req = await fetch(options.url, options)
    const data = await req.json()

    array_results.push(data.length > 1 ? data : data[0])

  }

  return array_results
  
};

module.exports = AdminData;
