var Material = require("../models/material");

function materialsIndex(req, res) {
    Material.find(function(err, materials) {
        if (err) return res.status(500).send();
        return res.status(200).json({ materials: materials });
    });
}

module.exports = {
    index: materialsIndex
};
