angular
  .module('SustainableApp')
  .controller('MaterialsController', MaterialsController);

MaterialsController.$inject = ['Material', '$state'];
function MaterialsController(Material, $state){

  var self = this;

  self.all           = [];
  self.material      = null;
  self.getMaterials  = getMaterials;


  function getMaterials() {
    Material.query(function(data){
      console.log(data);
      self.all = data.materials;

      console.log("Materials " + data);
    });
  }

  getMaterials();

  return self;
}
