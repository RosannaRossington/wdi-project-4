angular
  .module('SustainableApp')
  .controller('MaterialsController', MaterialsController);

MaterialsController.$inject = ['Material', '$state', '$stateParams'];
function MaterialsController(Material, $state, $stateParams){

  var self           = this;

  self.all           = [];
  self.getMaterials  = getMaterials;


  function getMaterials() {
    Material.query(function(data){
      console.log(data);
      self.all = data.materials;

      console.log("Materials " + self.all);
    });
  }

  getMaterials();

  return self;
}
