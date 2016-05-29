angular
  .module('SustainableApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User'];
function UsersController(User){

  var self = this;

  self.all           = [];
  self.user          = null;
  //self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    console.log(res);

      var token = res.token ? res.token : null;
      if (token) {
          // save the token in local storage
          // save the current user with the token
      }
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
  }

  function checkLoggedIn() {
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
