angular
  .module('SustainableApp')
  .controller('MainController', MainController);

function MainController() {
  var self = this;
  this.all = ["This is a project to demonstrate the use of Grunt as a helpful task runner."];
}
