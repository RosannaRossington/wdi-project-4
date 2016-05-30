var rp          = require("request-promise");
var Material    = require("./models/material");
var mongoose    = require("mongoose");
var config      = require("./config/config");

mongoose.connect(config.database, function(){
  console.log("Connected");
  console.log(config.database);
});

var msi = "http://msi.apparelcoalition.org/fetch/release2-0/materials.json";

function getMaterials(){
  Material.collection.drop();
  return rp(msi)
    .then(saveMaterials)
    .catch(function(err) {
      console.log(err);
      process.exit();
    });
}

function saveMaterials(response) {
  var responseJSON = JSON.parse(response);
  for (var i = 0; i < responseJSON.length; i++) {
    var material = new Material({
      geographic_location: responseJSON[i].geographic_location,
      material_name: responseJSON[i].material_name,
      total_score: responseJSON[i].total_score,
      chemistry_total: responseJSON[i].chemistry_total.score,
      energy_ghg_emissions_intensity_total: responseJSON[i].energy_ghg_emissions_intensity_total.score,
      water_land_intensity_total: responseJSON[i].water_land_intensity_total.score,
      physical_waste_total: responseJSON[i].physical_waste_total.score
    });
    material.save(function(err, material) {
      if (err) return console.log(err);
      return console.log(material);
    });
  }
}



task('default', getMaterials);
