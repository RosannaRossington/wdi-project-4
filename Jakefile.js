var rp          = require("request-promise");
var Material    = require("./models/material");
var mongoose    = require("mongoose");
var config      = require("./config/config");

mongoose.connect(config.database, function(){
  console.log("Connected");
  console.log(config.database);
});
