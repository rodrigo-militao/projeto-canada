// // const sql = require("./db.js");
// // const api = require("./api.js");
// const axios = require('axios')
// var request = require('request');


// // constructor
// const Dashboard = function (dashboard) {
//   this.id = dashboard.id;
// };
// /*=====================================================================================
//  ================================================================= Quantidade média ===
//   run_sync_shipments_last_month   (customer_id)
//   run_sync_shipments_this_month   (customer_id)
//   un_sync_shipments_avg_customers (customer_id)
// =======================================================================================*/
// Dashboard.findById = (dashboard, result) => {
//   console.log(dashboard.body)
//   const querys = [                         /* queries prior to heroku >>>
//     `SELECT AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (YEAR(delbydate) = YEAR(GETDATE())) AND (MONTH(delbydate) = MONTH(GETDATE())-1) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${dashboard.body.id}`,
//     `SELECT AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (YEAR(delbydate) = YEAR(GETDATE())) AND (MONTH(delbydate) = MONTH(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${dashboard.body.id}`,
//     `SELECT AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (YEAR(delbydate) = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id <> ${dashboard.body.id}`
//   */
//  //>>> /avg_amount
//     /* MONTH(GETDATE())-1) */`SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date = MONTH(GETDATE())-1) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${dashboard.body.id} GROUP BY year_del_date, month_del_date`,
//     /* MONTH(GETDATE())) */`SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date = MONTH(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${dashboard.body.id} GROUP BY year_del_date, month_del_date`,
//     /* total_amount */`SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id <> ${dashboard.body.id} GROUP BY year_del_date`,
//  //>>> /monthly_amount 
//     /* = */`SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id = ${dashboard.body.id} GROUP BY year_del_date, month_del_date ORDER BY month_del_date ASC`,
//     /* <> */`SELECT YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, AVG(ds_bill_charge) AS total_amount FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') and ds_billto_id <> ${dashboard.body.id} GROUP BY year_del_date, month_del_date ORDER BY month_del_date ASC`,
//  //>>> /last_5_ships
//     `SELECT top 5 ds_pronum, ds_bill_date, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status  FROM dba.disp_ship where ds_billto_id = ${dashboard.body.id} ORDER BY ds_bill_date DESC`,
//  //>>> next_5_ships
//     `SELECT top 5 ds_id, (SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC) AS del_date, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status FROM [DBA].disp_ship WHERE ds_billto_id = ${dashboard.body.id} ORDER BY del_date DESC`
//     ]

//   let array_results = []
//   let index = 0
//   for (const query in querys) {//

//     const json = querys[query].toString()
//     const options = {
//       method: 'POST',
//       url: 'https://connect.blackfly.dev/execute_sql/',
//       headers: {
//         Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsib3JnYW5pemF0aW9uX2tleSI6InRyYW5zcG9ydF9kX3NxdWFyZWQifSwiaWF0IjoxNjE0Nzk0ODY1LCJzY29wZSI6ImV4ZWN1dGVfc3FsIHJlYWQ6aW1hZ2VzIHdyaXRlOmltYWdlcyJ9.RqH4kpAhNoyi1Tjzg1VZ-kt4CW8xE_nzDeJ5GnmpNk0'
//       },
//       body: {
//         sql: json
//       },
//       json: true
//     };

//     request(options, function (error, response, body) {
//       if (error)
//         // throw new Error(error);
//         result(null, error);
//       console.log(error)

//       array_results[index] = body
//       index++;
//       console.log(body)
//       if (index == 7) { result(null, array_results); }
//     });

//   }

// };

// module.exports = Dashboard;
