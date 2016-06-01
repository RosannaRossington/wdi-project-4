angular
  .module('SustainableApp')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser','$state', '$stateParams', 'API', '$http'];
function UsersController(User, CurrentUser, $state, $stateParams, API, $http){

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
  self.productMaterial        = "";
  self.checkProductMaterials  = checkProductMaterials;

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

  if (checkLoggedIn()) {
    self.getUsers();
  }

  function getProductMaterials() {
    if (!self.productUrl) return console.log("no url!");
    $http.post(API + "/scrape/netaporter", {url: self.productUrl})
      .then(function(response) {
        self.productMaterial = response.data.text;
        console.log("****");
        console.log(self.productMaterial);
        checkProductMaterials(self.productMaterial);
      });
  }

//take self.productMaterial and check against materials in db
//search through list of Materials

//return the first material | return page with all the materials that then link to the material show page

//return show page

  function checkProductMaterials(productMaterial){
   self.productMaterial   = productMaterial;
   var regex              = /[.']*Leather|Modal|Nylon|Linen|Polyester fabric|Polyethylene foam|Polylactic acid fabric|Polypropylene|Polypropylene fabric|Polyurethane TPU, with solvent|Polyvinyl Alcohol|Pulp, wood|Ramie fabric|Rayon-viscose fabric, bamboo|Rayon-viscose fabric, wood|Rubber, natural latex|Rubber, polybutadiene|Silk|Spandex|Steel, carbon|Steel, stainless|Triexta fabric|Wool fabric|Cotton|Polyester fabric, recycled|Cotton fabric, woven|Polyester fabric, recycled|Polycarbonate|Wood|Down|Rubber|Zinc|Acrylic|Hemp|Jute|Lyocell|Cotton, organic/ig;

   var materialFound = productMaterial.match(regex);

    if ( productMaterial.match(regex) == -1 ){
          console.log("Sorry there is no information for this product." );
       }
    else
       {
         //return page with all materials in product
          console.log("Contains material " + materialFound );
       }
    console.log("Contains material " + materialFound );
  }

  return self;
}
