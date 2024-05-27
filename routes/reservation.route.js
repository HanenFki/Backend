const express = require('express');
const router = express.Router();

const Reservation = require('../models/reservation');
const auth = require("../middleware/auth.js");

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
    console.log('Requête reçue pour créer une réservation');
    try {
        const { utilisateurEmail, destinationID, forfaitID, prixtot, nbpersonne,date } = req.body;

        // Assurez-vous que les ID sont corrects et existent
        if (!utilisateurEmail || !destinationID || !forfaitID) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const reservation = new Reservation({
            utilisateurEmail,
            destinationID,
            forfaitID,
            prixtot,
            nbpersonne,
            date
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Afficher toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json(reservations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Modifier une réservation
router.put('/:reservationId', auth, async (req, res) => {
    try {
        const reservationModifiee = await Reservation.findByIdAndUpdate(
            req.params.reservationId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(reservationModifiee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une réservation
router.delete('/:reservationId', auth, async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.reservationId);
        res.json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
