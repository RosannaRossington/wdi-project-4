// set up port we want to connect the app to
// set up our database url
// secret is the jwt token
module.exports = {
  'port':     process.env.PORT || 3000,
  'database': process.env.MONGOLAB_URI || "mongodb://localhost/sustainable-app",
  'secret':   process.env.SECRET || "12Sas%3fdv&7"
};
