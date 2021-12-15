const fetch = require('node-fetch');

const Avg_amount = function (avg_amount) {
  this.id = avg_amount.id;
};

Avg_amount.findById = async (req) => {
  const options = {
    method: 'POST',
    url: 'https://connect.blackfly.dev/execute_sql/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsib3JnYW5pemF0aW9uX2tleSI6InRyYW5zcG9ydF9kX3NxdWFyZWQifSwiaWF0IjoxNjE0Nzk0ODY1LCJzY29wZSI6ImV4ZWN1dGVfc3FsIHJlYWQ6aW1hZ2VzIHdyaXRlOmltYWdlcyJ9.RqH4kpAhNoyi1Tjzg1VZ-kt4CW8xE_nzDeJ5GnmpNk0'
    }
  }
  const this_month_family_ranking_sql = "SELECT ds_billto_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, sum(ds_bill_charge) AS total_qty, ROW_NUMBER() OVER ( ORDER BY total_qty DESC ) row_num FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date = MONTH(GETDATE())) AND ds_status IN('K','N','Q','T','W') GROUP BY ds_billto_id, Customer, year_del_date, month_del_date ORDER BY total_qty DESC"
  const last_month_family_ranking_sql = "SELECT ds_billto_id, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, sum(ds_bill_charge) AS total_qty, ROW_NUMBER() OVER ( ORDER BY total_qty DESC ) row_num FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date = MONTH(GETDATE())-1) AND ds_status IN('K','N','Q','T','W') GROUP BY ds_billto_id, Customer, year_del_date, month_del_date ORDER BY total_qty DESC"
  const orders_sql = `SELECT 'last month avg customer' AS DataName, YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, COUNT(ds_bill_charge) AS total_qty FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date BETWEEN 1 AND MONTH(GETDATE())-1) AND ds_status IN('K','N','Q','T','W') ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""} GROUP BY year_del_date, month_del_date UNION SELECT 'this month avg customer' AS DataName, YEAR((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS year_del_date, MONTH((SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC)) AS month_del_date, COUNT(ds_bill_charge) AS total_qty FROM [DBA].disp_ship WHERE (year_del_date = YEAR(GETDATE())) AND (month_del_date BETWEEN 1 AND MONTH(GETDATE())) AND ds_status IN('K','N','Q','T','W') ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""}  GROUP BY year_del_date, month_del_date ORDER BY DataName, month_del_date ASC` 
  const in_transit_sql = `select (select ds_billto_id from [DBA].disp_ship where ds_id = cs_id) AS CustomerId, count(*) AS qty_orders from [DBA].current_shipments where ${req.body.id != "Admin" ? `CustomerId = ${req.body.id} and` : ""} cs_completed < cs_event_count and cs_completed > 0 and (cc_origin_conf = 'T' or cc_findest_conf = 'T') GROUP BY CustomerId ORDER BY qty_orders DESC`

  const req_this_month_family_ranking = await fetch(options.url, {...options, body: JSON.stringify({sql: this_month_family_ranking_sql})})
  const data_this_month_family_ranking = await req_this_month_family_ranking.json()

  const req_last_month_family_ranking = await fetch(options.url, {...options, body: JSON.stringify({sql: last_month_family_ranking_sql})})
  const data_last_month_family_ranking = await req_last_month_family_ranking.json()

  const req_orders = await fetch(options.url, {...options, body: JSON.stringify({sql: orders_sql})})
  const data_orders = await req_orders.json()

  const req_in_transit = await fetch(options.url, {...options, body: JSON.stringify({sql: in_transit_sql})})
  const data_in_transit = await req_in_transit.json()

  const data = {
    this_month_family_ranking: data_this_month_family_ranking.find(e => e.ds_billto_id == req.body.id),
    last_month_family_ranking: data_last_month_family_ranking.find(e => e.ds_billto_id == req.body.id),
    orders: data_orders,
    in_transit: data_in_transit.length > 1 ? data_in_transit.map(el => el.qty_orders).reduce((a, b) => a + b) : data_in_transit[0]["qty_orders"],
  }

  return data
  
};

module.exports = Avg_amount;