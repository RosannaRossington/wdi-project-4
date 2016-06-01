var Material = require("../models/material");

function materialsIndex(req, res) {
  Material.find(function(err, materials) {
      if (err) return res.status(500).send();
      return res.status(200).json({ materials:materials });
  });
}

function materialsShow(req, res){
  Material.findById(req.params.id, function(err, material){
    if (err) return res.status(404).json({ message: 'Something went wrong.' });
    res.status(200).json({material:material});
  });
}

function materialsSearch(req, res){
  console.log(req.body);
  var materials = [];
  req.body.forEach(function(material, index) {
    Material.findOne({ $text: { $search: material }}, function(err, material) {
      if (err) return res.status(500).send(err);
      materials.push(material);
      if (index === req.body.length-1) return res.status(200)
        .json({materials: materials});
    });
  });
}

module.exports = {
    index: materialsIndex,
    show:  materialsShow,
    search: materialsSearch
};
