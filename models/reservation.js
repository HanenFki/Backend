const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    utilisateurEmail: { type: String, ref: 'User', required: true },
    destinationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    forfaitID:{ type: mongoose.Schema.Types.ObjectId, ref: 'Forfait', required: true },
  
    prixtot: { type: Number, required: true },
    nbpersonne:{ type: Number, required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
