var mongoose = require("mongoose");

    var materialSchema = new mongoose.Schema({
            data_sources: String,
            geographic_location: String,
            id: Number,
            material_name: String,
            total_score: Number,
            // "energy_intensity": {
            //     "data": 113.271836129113,
            //     max_points: Number.4,
            //   score: 2.67393374123873,
            //     "scoring_drivers": {
            //         "phase_1": "Phase 1: Very low energy use relative to most other materials",
            //         "phase_2": "Phase 2: Very high energy use relative to other fibers"
            //     }
            // },
            // "ghg_emissions_intensity": {
            //     "data": 5.86296296296296,
            //     max_points: Number.6,
            //   score: 4.18821100744461,
            //     "scoring_drivers": {
            //         "phase_1": "Phase 1: Very low energy use relative to most other materials",
            //         "phase_2": "Phase 2: Very high energy use relative to other fibers"
            //     }
            // },
            // "water_intensity": {
            //     "data": 347,
            //     max_points: Number.36,
            //   score: 4.43359268243445,
            //     "scoring_drivers": {
            //         "phase_1": "Phase 1: Very low energy use relative to most other materials",
            //         "phase_2": "Phase 2: Very high energy use relative to other fibers"
            //     }
            // },
            // "land_use_intensity": {
            //     "data": 0,
            //     max_points: Number.64,
            //   score: 0,
            //     "scoring_drivers": {
            //         "phase_1": "Phase 1: Very low energy use relative to most other materials",
            //         "phase_2": "Phase 2: Very high energy use relative to other fibers"
            //     }
            // },
            chemistry_total: {
                max_points: Number,
              score:  Number
            },
            energy_ghg_emissions_intensity_total: {
                max_points: Number,
              score:  Number
            },
            water_land_intensity_total: {
                max_points: Number,
              score:  Number
            },
            physical_waste_total: {
                max_points: Number,
              score:  Number
            }
    });

module.exports = mongoose.model("Material", materialSchema);
