const mongoose = require("mongoose");

const forfaitSchema = new mongoose.Schema({
    destinationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    duree: { type: Number, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    autresDetails: { type: String },
    date:{ type: Date, required: true },
});

module.exports = mongoose.model('Forfait', forfaitSchema);
