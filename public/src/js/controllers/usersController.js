angular
  .module('SustainableApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'Material', 'CurrentUser','$state', '$stateParams', 'API', '$http'];
function UsersController(User, Material, CurrentUser, $state, $stateParams, API, $http){

  var self                    = this;

  self.all                    = [];
  self.user                   = null;
  self.currentUser            = null;
  self.error                  = null;
  self.getUsers               = getUsers;
  self.register               = register;
  self.login                  = login;
  self.logout                 = logout;
  self.checkLoggedIn          = checkLoggedIn;
  self.getProductMaterials    = getProductMaterials;
  self.productUrl             = "";
  self.productMaterials       = [];
  self.cleanProducts          = cleanProducts;
  self.checkProductMaterials  = checkProductMaterials;
  self.searchedMaterials      = "";

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
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

  if (checkLoggedIn()) {
    self.getUsers();
  }

  function getProductMaterials() {
    if (!self.productUrl) return console.log("no url!");
    $http.post(API + "/scrape/netaporter", {url: self.productUrl})
      .then(function(response) {
        self.productMaterial = response.data.text;
        checkProductMaterials(self.productMaterial);
      });
  }

//search the database and return the materials that exist
 function checkProductMaterials(productMaterial){
   var materials = self.cleanProducts(productMaterial);
   Material.search(materials, function(response) {
     self.searchedMaterials = response.materials;
     $state.go('productMaterial');
   });
 }
//convert product page materials to words and remove duplicates
 function cleanProducts(productMaterial) {
   var productString  = productMaterial.replace(/\W|\d|lining/ig, " ");
   var productArray   = productString.replace(/\s+/ig, ',').split(',');
   var convertedArray = productArray.map(function(material) {
     return (material === 'suede') ? 'leather': material;
   });
     return convertedArray.filter(function(item, pos) {
     return (convertedArray.indexOf(item) == pos) && item;
   });
 }

  return self;
}
