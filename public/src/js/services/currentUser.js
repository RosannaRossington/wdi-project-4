angular
  .module('SustainableApp')
  .service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){
    var self = this;
    console.log("this is " + this);
    self.getUser = getUser;
    self.clearUser = clearUser;
    self.user = getUser();

    function getUser() {
        return self.user ? self.user : TokenService.decodeToken();
    }

    function clearUser(){
      self.user = null;
      TokenService.removeToken();
    }
}
