const avg_amount = require("../models/avg_amount.model");
const monthly_amount = require("../models/monthly_amount.model");
const last_5_ships = require("../models/last_5_ships.model");
const next_5_ships = require("../models/next_5_ships.model");

const average = (array) => {
  if (array.length === 0) return 0;
  return array.reduce((a, b) => a + b) / array.length;
}

exports.findAll = async (req, res) => {
  
  try {
    const current_month = new Date().getMonth() + 1;
    const last_month = current_month - 1;

    const { this_month_family_ranking, last_month_family_ranking, in_transit, orders, ontime }  = await avg_amount.findById(req)

    const monthly_amount_response  = await monthly_amount.findById(req)
    const last_5_ships_response  = await last_5_ships.findById(req)
    const next_5_ships_response  = await next_5_ships.findById(req)

    const monthly_data = monthly_amount_response[0]
    const customer_data = monthly_amount_response[1]

    //console.log(orders)
    const this_month_orders_average = average(orders.filter(e => e.DataName == "this month avg customer").map(e => e.total_qty))
    const last_month_orders_average = average(orders.filter(e => e.DataName == "last month avg customer").map(e => e.total_qty))

    const total_qtd_ontime = ontime.filter(e => e.on_time == "On-Time").length

    const response = {
      "this_month_family_ranking": this_month_family_ranking || 0, 
      "last_month_family_ranking": last_month_family_ranking || 0, 
      "bar_chart_data": {
        "this_month_orders": orders.find(o => o.DataName == "this month avg customer" && o.month_del_date == current_month), 
        "last_month_orders": orders.find(o => o.DataName == "last month avg customer" && o.month_del_date == last_month),
        "this_month_orders_average": this_month_orders_average,
        "last_month_orders_average": last_month_orders_average,
      },
      "in_transit": in_transit,
      "next_5": next_5_ships_response[0],
      "last_5": last_5_ships_response[0],
      "month_data": monthly_data, 
      "customer_data": customer_data,
      "ontime": total_qtd_ontime / ontime.length * 100
    }
    
    return res.json(response);
  } catch (err) {
    console.error("error: ", err.message);
    res.status(500).send({error: err.message});
  }
};
