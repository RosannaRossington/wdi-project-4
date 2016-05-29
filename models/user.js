var mongoose  = require("mongoose");
//  bcrypt to allow us to store a secure hashed version of our password into the database
var bcrypt    = require("bcrypt-nodejs");
var validator = require("validator");

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

// validate the hashed password - checking if someone is logging in with valid credentials
// Create an instance (.methods) method to validate a password
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash, null);
};

// ***** VIRTUAL FIELDS ***** //
// Setup a virtual field of password so that we can use that instead of passwordHash
userSchema.virtual("password")
.set(function(password){
  // Save a temp variable to the user object so that we can still use the value
  this._password    = password;
  // Save the hashed password to the field passwordHash
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

  // ***** VALIDATIONS ***** //
  userSchema.path("passwordHash")
  .validate(function(){
    if (this.isNew) {
      if (!this._password) {
        this.invalidate("password", "required");
      }
      if (this._password.length < 6) {
        this.invalidate("password", "Sorry, your password must be greater than 6 characters");
      }
      if (this._password !== this._passwordConfirmation) {
        this.invalidate("passwordConfirmation", "Sorry, your passwords must match");
      }
    }
  });

  userSchema.path("email")
  .validate(function(email) {
    if (!validator.isEmail(email)) {
      this.invalidate("email", "You must enter a valid email address");
    }
  });
//ensure the users password is still hidden when requesting information from API 
  userSchema.set('toJSON', {
  transform: function(doc, ret, options){
      delete ret.passwordHash;
      return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
