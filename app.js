
// ***** REQUIRING PACKAGES ***** //
// Require the express package
var express         = require('express');
// Require morgan for better logging in the terminal
var morgan          = require("morgan");
// Require method-override package to allow us to use PUT/PATCH/DELETE verbs
var methodOverride  = require("method-override");
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var passport        = require("passport");
var expressJWT      = require("express-jwt");
// request to our API will come from a different server so need CORS
var cors            = require("cors");
var config          = require("./config/config");

// Create a new app by invoking the express function
var app             = express();

//var User            = mongoose.model("User");

// ***** DATABASE ***** //
// set up the app.js so it can connect to url
mongoose.connect(config.database);

// ***** PASSPORT ***** //
require("./config/passport")(passport);

// ***** MIDDLEWARE ***** //
// Use the morgan middleware function
app.use(morgan('dev'));
// Use the body-parser middleware to enable us to read the req.body
app.use(bodyParser.json());
  // // Allow us to transform user[name] syntax into { user: { name: }}
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(parser.json({urlencoded: true}));

// Look for _method value in a request and replace the POST method
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(passport.initialize());
app.use(cors());

// ***** JWT AUTHENTICATION ***** //
// expressJWT checks for a valid JWT token in the header of the HTTP request. It looks for an Authorization Token with the value "Bearer <JWT token>". If it doesn't find one, then it will throw a 403 unauthorized access HTTP status.
// We won't protect the routes for register and login as we need people to be able to access tokens.
app.use('/api', expressJWT({ secret: config.secret })
.unless({
  path: [
    { url: '/api/login', methods: ['POST'] },
    { url: '/api/register', methods: ['POST'] }
  ]
}));

// Error handling to send a prettier error back as an API response
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

// ***** ROUTING ***** //
var routes          = require("./config/routes");
app.use("/api", routes);

app.use("/", express.static("bower_components"));
app.use("/", express.static("public"));

app.get("/*", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(config.port, function(){
console.log("Express is alive and kicking on port: ", config.port);
});
