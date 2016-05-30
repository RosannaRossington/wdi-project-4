angular
  .module('SustainableApp', ['ngResource', 'ui.router','angular-jwt'])
  .constant('API', 'http://localhost:3000/api')
  .config(Router)
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });

Router.$inject = ['$stateProvider', '$locationProvider','$urlRouterProvider'];
function Router($stateProvider,$locationProvider, $urlRouterProvider) {
   $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "src/js/views/home.html"
      // controller:   "UsersController",
      // controllerAs: "users"
    })
    .state('login', {
      url: "/login",
      templateUrl: "/src/js/views/authentications/login.html"
      // controller:   "UsersController",
      // controllerAs: "users"
    })
    .state('register', {
      url: "/register",
      templateUrl: "/src/js/views/authentications/register.html",
      controller:   "UsersController",
      controllerAs: "user"
    })
    .state('users', {
      url: "/users",
      templateUrl: "/src/js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "/src/js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}
