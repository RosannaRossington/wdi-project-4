angular
  .module('SustainableApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser','$state', '$stateParams', 'API', '$http'];
function UsersController(User, CurrentUser, $state, $stateParams, API, $http){

  var self           = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.getMaterials  = getMaterials;
  self.productUrl    = "";

  function getUsers() {
    User.query(function(data){
      console.log(data);
      self.all = data.users;

      console.log("UCtrl " + self.all);
    });
  }

  function handleLogin(res) {
    console.log("handleLogin" + res);

      var token = res.token ? res.token : null;
      if (token) {
        self.currentUser = CurrentUser.getUser();
        self.getUsers();
        $state.go('home');
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
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  function getMaterials() {
    if (!self.productUrl) return console.log("no url!");
    $http.post(API + "/scrape/netaporter", {url: self.productUrl})
      .then(function(response) {
        console.log(response.data.text);
      });
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
