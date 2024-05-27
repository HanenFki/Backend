const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    attractionsTouristiques: [{ type: String }]
});

module.exports = mongoose.model('Destination', destinationSchema);
