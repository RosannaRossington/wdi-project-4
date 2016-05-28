var mongoose  = require("mongoose");
//  bcrypt to allow us to store a secure hashed version of our password into the database
var bcrypt    = require("bcrypt-nodejs");
// var validator = require("validator");

var userSchema = new mongoose.Schema({
  firstName:    { type: String },
  lastName:     { type: String },
  image:        { type: String },
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String }
}, {
  timestamps: true
});

// ***** VIRTUAL FIELDS ***** //
// Setup a virtual field of password so that we can use that instead of passwordHash
userSchema.virtual("password")
.set(function(password){
  // Save a temp variable to the user object so that we can still use the value
  this._password    = password;
  // Save the hashed password to the field passwordHash
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});


module.exports = mongoose.model("User", userSchema);
