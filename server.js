// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
/*********************************************/
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
/*********************************************/
// New Date API endpoint
app.get("/timestamp/api/:date", function (req, res) {
  let timestamp = req.params.date;
  if (timestamp.match(/\d{5,}/)) {
    timestamp = +timestamp;
  }
  let inputDate = new Date(timestamp);
  if (inputDate.toUTCString() == "Invalid Date") {
    res.json({
      error : "Invalid Date"
      });
  }
  res.json({
    unix: inputDate.valueOf(),
    utc: inputDate.toUTCString()
    });
  });
/*********************************************/
// New Date API endpoint for empty values
app.get("/timestamp/api/", function (req, res) {
  let inputToDate = new Date();  
  res.json({
    unix: inputToDate.valueOf(),
    utc: inputToDate.toUTCString()
    });
});
/*********************************************/
// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
/*********************************************/