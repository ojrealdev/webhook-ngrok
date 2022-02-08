const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser')

const options = {
  noColor: true
};

// create an express app and configure it with boadyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create our webhook endpoint to recive webhooks from M-Pesa
app.post('/request', (req, res) => {
  console.log('-----------Received M-Pesa webhook-----------');
	
  // format and dump the request payload recieved from M-Pesa in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log('-----------------------');
	
  let message = {
	  "ResponseCode": "00000000",
	  "ResponseDesc": "success"
	};
	
  // respond to M-Pesa servers with a success message
  res.json(message);
});

const server = app.listen(5001, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`server listening on port ${port}` );
});