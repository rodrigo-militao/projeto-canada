const avg_amount = require("../models/avg_amount.model");
const monthly_amount = require("../models/monthly_amount.model");
const last_5_ships = require("../models/last_5_ships.model");
const next_5_ships = require("../models/next_5_ships.model");


exports.findAll = async (req, res) => {
  
  try {
    const avg_amount_response  = await avg_amount.findById(req) 
    const monthly_amount_response  = await monthly_amount.findById(req)
    const last_5_ships_response  = await last_5_ships.findById(req)
    const next_5_ships_response  = await next_5_ships.findById(req)
  
    const avg_last_month = avg_amount_response[0]
    const avg_this_month = avg_amount_response[1]
    const avg_customers = avg_amount_response[2]
    const monthly_data = monthly_amount_response[0]
    const customer_data = monthly_amount_response[1]
    const response = {
      "last_month": avg_last_month['total_qty'], 
      "this_month": avg_this_month['total_qty'], 
      "customers": avg_customers['total_amount'], 
      "next_5": next_5_ships_response[0],
      "last_5": last_5_ships_response[0],
      "month_data": monthly_data, 
      "customer_data": customer_data
    }
    
    return res.json(response);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
};
