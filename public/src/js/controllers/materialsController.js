angular
  .module('SustainableApp')
  .controller('MaterialsController', MaterialsController);

MaterialsController.$inject = ['Material', '$state', '$stateParams'];
function MaterialsController(Material, $state, $stateParams){

  var self           = this;
  self.all           = [];
  self.getMaterials  = getMaterials;
  self.getMaterial   = getMaterial;
  self.hoverIn       = hoverIn;
  self.hoverOut      = hoverOut;


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
// Materials Show Page
function hoverIn(){
  console.log("hey");
   self.hoverEdit = true;
   console.log(self.hoverEdit);
}
function hoverOut(){
    self.hoverEdit = false;
}

  getMaterials();
  getMaterial();

  return self;
}
