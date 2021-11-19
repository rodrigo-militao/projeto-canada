// // const sql = require("./db.js");
// // const api = require("./api.js");
// const axios = require('axios')
// var request = require('request');


// // constructor
// const Order_type = function (order_type) {
//   this.id = order_type.id;
// };

// Order_type.findById = (order_type, result) => {

//   const querys = [
//     `queryqueryquery${order_type.body.id}`,
//     `queryqueryquery${order_type.body.id}`,
//     `queryqueryquery${order_type.body.id}`
//   ]

//   let array_results = []
//   let index = 0
//   for (const query in querys) {
   
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
//       if (error) throw new Error(error);    
//       array_results[index] = body
//       index++;
//       console.log(body)
//       if (index == 3){result(null, array_results);}
//     });
    
//   }
  
// };

// module.exports = Order_type;