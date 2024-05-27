const express = require('express');
const router = express.Router();
const Forfait = require('../models/forfait');
const auth = require( "../middleware/auth.js");
const forfait = require('../models/forfait');
router.get('/pagination', async (req, res) => {
    const page = req.query.page || 1; // Page actuelle
    const limit = req.query.limit || 5; // Nombre d'éléments par page
    // Calculez le nombre d'éléments à sauter (offset)
    const offset = (page - 1) * limit;
    try {
        // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
        const ForfaitTot = await forfait.countDocuments();
        const forfaits = await Forfait.find({})
        .populate('destinationID')
        .skip(offset)
        .limit(limit);
    
        res.status(200).json({ forfaits: forfaits, tot: ForfaitTot });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Afficher tous les forfaits
router.get('/', async (req, res) => {
    try {
        const forfaits = await Forfait.find({});
        res.status(200).json(forfaits);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Créer un nouveau forfait
router.post('/', async (req, res) => {
    // Extraire les données de la requête
    const { destinationID, duree, prix, description, autresDetails,date } = req.body;

    try {
        // Créer un nouveau forfait
        const nouveauForfait = new Forfait({
            destinationID: destinationID,
            duree: duree,
            prix: prix,
            date:date,
            description: description,
            autresDetails: autresDetails
        });

        // Enregistrer le nouveau forfait dans la base de données
        const forfaitCree = await nouveauForfait.save();

        // Répondre avec le nouveau forfait créé
        res.status(201).json(forfaitCree);
    } catch (error) {
        // En cas d'erreur, répondre avec un code d'erreur et un message d'erreur
        res.status(400).json({ message: error.message });
    }
});

// Afficher un forfait spécifique
router.get('/:forfaitId', async (req, res) => {
    try {
        const forfait = await Forfait.findById(req.params.forfaitId);
        res.status(200).json(forfait);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Modifier un forfait
router.put('/:forfaitId', async (req, res) => {
    try {
        const forfaitModifie = await Forfait.findByIdAndUpdate(
            req.params.forfaitId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(forfaitModifie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer un forfait
router.delete('/:forfaitId', async (req, res) => {
    try {
        await Forfait.findByIdAndDelete(req.params.forfaitId);
        res.json({ message: "Forfait supprimé avec succès." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
