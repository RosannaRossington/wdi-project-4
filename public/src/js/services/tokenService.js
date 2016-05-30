angular
  .module('SustainableApp')
  .service('TokenService', TokenService);

  TokenService.$inject = ["$window", "jwtHelper"];
  function TokenService($window, jwtHelper){
        var self = this;

        self.setToken = setToken;
        self.getToken = getToken;
        self.removeToken = removeToken;
        self.decodeToken = decodeToken;

  //actually "save"Token
        function setToken(token){
          return $window.localStorage.setItem('auth-token', token);
        }
  //when sending a req to API - (if) get the token from local storage and set it as the header for the request.
        function getToken() {
          return $window.localStorage.getItem('auth-token');
        }

        function removeToken() {
        return $window.localStorage.removeItem('auth-token');
      }


  // Get the token. Valid? decode it using the jwtHelper and return data
        function decodeToken() {
          var token = self.getToken();
          if (token) {
            var decodedUser = jwtHelper.decodeToken(token);
            return token ? decodedUser : null;
          }
        }
    }
