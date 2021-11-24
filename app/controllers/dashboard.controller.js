const shipments = require("../models/shipments.model.js");
const avg_amount = require("../models/avg_amount.model");
const monthly_amount = require("../models/monthly_amount.model");
const last_5_ships = require("../models/last_5_ships.model");
const next_5_ships = require("../models/next_5_ships.model");


//Retrieve all Customers from the database.
exports.findAll = async (req, res) => {
  
  const shipments_response  = await shipments.findById(req)  
  const avg_amount_response  = await avg_amount.findById(req) 
  const monthly_amount_response  = await monthly_amount.findById(req)
  const last_5_ships_response  = await last_5_ships.findById(req)
  const next_5_ships_response  = await next_5_ships.findById(req)

  const json_response = {
    "shipments": shipments_response,
    "avg_amount": avg_amount_response,
    "monthly_amount": monthly_amount_response,
    "last_5_ships": last_5_ships_response,
    "next_5_ships": next_5_ships_response
  } 
  
  console.log(json_response);
  return res.json(json_response);

    
};


// const json_response = {
//   "mensagem1 ": avg_amount_response,
//   "mensagem2 ": monthly_amount_response,
//   "mensagem3 ": last_5_ships_response,
//   "mensagem4 ": next_5_ships_response

// }
// return res.send(json_response);

// const shipments = require("../models/shipments.model.js");
// const avg_amount = require("../models/avg_amount.model");
// const monthly_amount = require("../models/monthly_amount.model");
// const last_5_ships = require("../models/last_5_ships.model");
// const next_5_ships = require("../models/next_5_ships.model");




// // Retrieve all Customers from the database.
// exports.findAll = async (req, res) => {
    
// //   const shipments_response = await shipments.findById(req, (err, data) => {

// //     if (err)
// //       res.status(500).send({
// //         message:
// //           err.message || "Some error occurred while retrieving customers."
// //       });
// //      return data
    
// //   });

// exports.findAll = (req, res) => {
//   // console.log(req);

//     avg_amount.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving customers."
//       });
//     else res.send(data);
    
//   });
// };

//   const avg_amount_response = avg_amount.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving customers."
//       });
//     return data;

//   });

//   const monthly_amount_response = monthly_amount.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving customers."
//       });
//     return data;
//   });

//   const last_5_ships_response = last_5_ships.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving customers."
//       });
//     return data;

//   });

//   const next_5_ships_response = next_5_ships.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving customers."
//       });
//     return data;

//   });

//   const json_response = {
//     "mensagem1 ": avg_amount_response,
//     "mensagem2 ": monthly_amount_response,
//     "mensagem3 ": last_5_ships_response,
//     "mensagem4 ": next_5_ships_response

//   }

//   return res.send(json_response);
// };
//===========================================================================
// const dashboard = require("../models/dashboard.model");

// // Retrieve all Customers from the database.
// exports.findAll = (req, res) => {
//   // console.log(req);

//     dashboard.findById(req, (err, data) => {

//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving customers."
//       });
//     else res.send(data);
    
//   });
// };
