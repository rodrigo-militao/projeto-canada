const fetch = require('node-fetch')

const Shipments = function (shipments) {
  this.id = shipments.id;
};

Shipments.findById = async (req) => {

  const querys = [
    `SELECT ds_ref1_text AS Container_Num, ds_id AS Ref_Num, ds_ref2_text AS Chassis_Num, ds_ref3_text AS Work_Order, ds_pronum, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_billto_id) AS Customer, (SELECT top 1 de_arrdate FROM [DBA].disp_events WHERE de_shipment_id = ds_id and de_site = ds_findest_id and de_arrdate IS NOT NULL ORDER BY de_ship_seq ASC) AS del_date, Vessel, (SELECT Line FROM [DBA].[EquipmentLeaseType] where Id = SizeN) AS LineName, Voyage, (SELECT Type FROM [DBA].[EquipmentLeaseType] where Id = SizeN) AS NumSize, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_origin_id) AS Origin, (SELECT co_name FROM [DBA].companies WHERE co_id = ds_findest_id) AS Desti, (SELECT co_name FROM [DBA].companies WHERE co_id = RetLocId) AS RetLoc, etadate, (SELECT top 1 lease_ftxdate FROM [DBA].[outside_ship_lease] where [outside_ship_lease].ds_id = [disp_ship].ds_id) AS last_free_date, (CASE WHEN ds_status = 'K' THEN 'OPEN' WHEN ds_status = 'N' THEN 'AUTHORIZED' WHEN ds_status = 'Q' THEN 'AUDIT REQ' WHEN ds_status = 'T' THEN 'AUDITED' WHEN ds_status = 'W' THEN 'BILLED' ELSE 'NOT FOUND' END) AS ship_status, (CASE WHEN movecode = 'I' THEN 'IMPORT' WHEN movecode = 'E' THEN 'EXPORT' WHEN movecode = 'O' THEN 'ONEWAY' ELSE 'NOT FOUND' END) AS ship_type, (select top 1 eq_id FROM [DBA].equip2_info WHERE eq_ref = ds_ref1_text) AS ContId, (SELECT top 1 lt_id FROM [DBA].[outside_ship_lease] where oe_id = ContId) AS SizeN, (SELECT top 1 de_site FROM [DBA].disp_events WHERE de_shipment_id = ds_id ORDER BY de_ship_seq DESC) AS RetLocId FROM [DBA].disp_ship WHERE (YEAR(del_date) = YEAR(GETDATE())) AND ds_status IN('K','N','Q','T','W') ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""} ORDER BY del_date DESC`,
    `SELECT COUNT(ds_id) AS Billed FROM [DBA].disp_ship WHERE YEAR(ds_bill_date) = YEAR(GETDATE()) and ds_status = 'W' ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""}`,
    `SELECT COUNT(ds_id) AS Complete FROM [DBA].disp_ship WHERE ds_status IN('N','Q','T')  ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""}`,
    `SELECT COUNT(ds_id) AS ShipOpen FROM [DBA].disp_ship WHERE ds_status = 'K' ${req.body.id != "Admin" ? `and ds_billto_id = ${req.body.id}` : ""}`
  ]

    const json = querys[0].toString()
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

    const req_shipments = await fetch(options.url, options)
    const shipments = await req_shipments.json()

    const res_orders_billed = await fetch(options.url, {...options, body: JSON.stringify({sql: querys[1]})})
    const orders_billed = await res_orders_billed.json()

    const res_orders_completed = await fetch(options.url, {...options, body: JSON.stringify({sql: querys[2]})})
    const orders_completed = await res_orders_completed.json()

    const res_orders_open = await fetch(options.url, {...options, body: JSON.stringify({sql: querys[3]})})
    const orders_open = await res_orders_open.json()


    const response = {
      "shipments": shipments,
      "orders_billed": orders_billed[0]['Billed'],
      "orders_completed": orders_completed[0]['Complete'],
      "orders_open": orders_open[0]['ShipOpen']
    }

  return response
  
};

module.exports = Shipments;
