angular
  .module('logging')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser'];
function UsersController(User, CurrentUser){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
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
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
  }

  function login() {
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