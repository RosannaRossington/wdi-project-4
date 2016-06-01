angular
  .module('SustainableApp')
  .controller('MaterialsController', MaterialsController);

MaterialsController.$inject = ['Material', '$state', '$stateParams'];
function MaterialsController(Material, $state, $stateParams){

  var self           = this;
  self.all           = [];
  self.getMaterials  = getMaterials;
  self.getMaterial   = getMaterial;

  function getMaterials() {
    Material.query(function(data){
      self.all = data.materials;
    });
  }

function getMaterial() {
  Material.get({ id: $stateParams.id },function(res){
      self.material = res;
        console.log("this is material", res);
  });
}
  getMaterials();
  getMaterial();

  return self;
}
