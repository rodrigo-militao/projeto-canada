var http = require("http");
var path = require("path");
var express = require("express");
const cors = require('cors');
require("./Date.prototype.dateAdd");
var bodyParser = require('body-parser')//

//resolvendo o problema na autorização do endpoint via --tail <>

const PORT = process.env.PORT || 12103;

var app = express();
app.use(cors())
var server = http.createServer(app);


//Remoto IP
app.set('trust proxy', true);
var get_ip = require('ipware')().get_ip;
const socketIO = require('socket.io');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//Preferencialmente adicione as rotas em arquivos separados
require("./app/routes/_user.routes.js")(app);   //>database
require("./app/routes/_user.routes.js")(app);   //>database
///////////////////////////////////////////////////////////////
require("./app/routes/admin_page.routes.js")(app);  //>API 
require("./app/routes/avg_amount.routes.js")(app);  //..
require("./app/routes/contacts.routes.js")(app);
require("./app/routes/dashboard.routes.js")(app);
require("./app/routes/last_5_ships.routes.js")(app);
require("./app/routes/monthly_amount.routes.js")(app);
require("./app/routes/next_5_ships.routes.js")(app);
//require("./app/routes/on_time.routes.js")(app);
//require("./app/routes/order_type.routes.js")(app);
require("./app/routes/orders_month.routes.js")(app);  //..
require("./app/routes/shipments.routes.js")(app);   //>API

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application. - ttpsystemcali" });
});

var staticPath = path.resolve(__dirname, "");
app.use(express.static(staticPath));

server.listen(PORT, function () {
  console.log("Server is listening at http://localhost:" + PORT);
});

/*==============================================================================================
=================================================================================== SEND MAIL ==*/

exports.send_mail = async (mail, text, opcao) => {

  let testAccount = await nodemailer.createTestAccount();
  testAccount.user = ""
  testAccount.pass = ""

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  switch(opcao) {
    case "sendtest":
      text = 'test succeded!'
      console.log('email disparado: ' + text)
      break;
    case "customer":
      text = 'Hello Customer!'
      console.log('email disparado: ' + text)
    break;
    
    default:
      // code block
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '', 
    to: mail, 
    subject: "Hello ✔", 
    text: text, 
    html: "<b>Hello world?</b>", 
  }).then(message => {
    console.log(message); //tratamento necessário para o transporter funcionar, não remover
  }).catch(err => {
    console.log(err); //tratamento necessário para o transporter funcionar, não remover
  })

};