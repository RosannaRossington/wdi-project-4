var mongoose = require("mongoose");

    var materialSchema = new mongoose.Schema({
            geographic_location: String,
            material_name: String,
            total_score: Number,
            chemistry_total: Number,
            energy_ghg_emissions_intensity_total: Number,
            water_land_intensity_total: Number,
            physical_waste_total: Number
    });

module.exports = mongoose.model("Material", materialSchema);
