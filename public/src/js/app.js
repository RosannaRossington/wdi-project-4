angular
  .module('SustainableApp', ['ngResource', 'ui.router','angular-jwt'])
  .constant('API', 'http://localhost:3000/api')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "/src/js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "/src/js/views/authentications/register.html"
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
