var Material = require("../models/material");

function materialsIndex(req, res) {
  Material.find(function(err, materials) {
      if (err) return res.status(500).send();
      return res.status(200).json({ materials:materials });
  });
}

function materialsShow(req, res){
  Material.findById(req.params.id, function(err, user){
    if (err) return res.status(404).json({ message: 'Something went wrong.' });
    res.status(200).json({material:material});
  });
}

module.exports = {
    index: materialsIndex,
    show:  materialsShow
};
