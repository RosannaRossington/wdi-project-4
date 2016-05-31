var mongoose = require("mongoose");

    var productSchema = new mongoose.Schema({
            product_material: String
    });

module.exports = mongoose.model("Product", productSchema);
