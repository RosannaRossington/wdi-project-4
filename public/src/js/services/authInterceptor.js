//Add tokens to headers of outgoing requests.
//Check incoming requests for tokens so that they can be saved.
angular
    .module('SustainableApp')
    .factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ["API"];

function AuthInterceptor(API) {
  return {
    request: function(config){
      return config;
    },

    //check if there is a token
        //inject our newly written token service into the interceptor to use setToken function if there is a token present.
      response: function(res) {
          console.log(res);
          if (res.config.url.indexOf(API) === 0 && res.data.token) {
             TokenService.setToken(res.data.token);
           }
          return res;
      }
  };
}
