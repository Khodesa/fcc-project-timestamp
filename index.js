// index.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  var param = Number(req.params.date) ? Number(req.params.date) : (req.params.date);

  /*  if (Number(param)) {
      var date = new Date(Number(param));
    } else {*/
  var date = (!param) ? new Date() : new Date(param);
  // }
  
  if (date != "Invalid Date") {
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
  } else {
    var err = new Error("Invalid Date");
    next(err)
   // res.json({error: "Invalid  Date"})
  }
});

app.use(function(err, req, res, next){
  res.status(500);
  res.json({error: "Invalid Date"})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
