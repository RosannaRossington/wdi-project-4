angular
  .module('SustainableApp')
  .controller('MaterialsController', MaterialsController);

MaterialsController.$inject = ['Material', '$state', '$stateParams'];
function MaterialsController(Material, $state, $stateParams){

  var self                      = this;

  self.all                      = [];
  self.getMaterials             = getMaterials;
  self.getMaterial              = getMaterial;

  self.toggleOn                 = toggleOn;
  self.toggleOff                = toggleOff;
  self.chemistry_heading        = true;
  self.chemistry_score          = false;
  self.ghg_heading              = true;
  self.ghg_score                = false;
  self.water_heading            = true;
  self.water_score              = false;
  self.waste_heading            = true;
  self.waste_score              = false;
  self.start_heading            = true;
  self.start_score              = false;
  self.total_heading            = true;
  self.total_score              = false;


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
function toggleOn(section) {
     self[section+'_heading'] = false;
     self[section+'_score']   = true;
}

function toggleOff(section){
  self[section+'_heading'] = true;
  self[section+'_score']   = false;
}

  getMaterials();
  getMaterial();

  return self;
}
