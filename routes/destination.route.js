var express = require('express');
var router = express.Router();

const destination = require('../models/destination');
const auth = require( "../middleware/auth.js");
router.get('/pagination', async (req, res) => {
    try {
        const destinations = await destination.find({});
        res.status(200).json({ destinations: destinations, tot: destinations.length });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


// afficher 
router.get('/', async (req, res, )=> {
    try {

        
        const cat = await destination.find({}, null, {sort: {'_id': -1}})
        
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

// créer 
router.post('/',async (req, res) => {
   // Extraire les données de la requête
   const { nom, description, images, attractionsTouristiques } = req.body;

   try {
       // Créer une nouvelle destination
       const nouvelleDestination = new destination({
           nom: nom,
           description: description,
           images: images,
           attractionsTouristiques: attractionsTouristiques
       });

       // Enregistrer la nouvelle destination dans la base de données
       const destinationCree = await nouvelleDestination.save();

       // Répondre avec la nouvelle destination créée
       res.status(201).json(destinationCree);
   } catch (error) {
       // En cas d'erreur, répondre avec un code d'erreur et un message d'erreur
       res.status(400).json({ message: error.message });
   }
});
// chercher
router.get('/:destinationId',async(req, res)=>{
    try {

        const dest = await destination.findById(req.params.destinationId);
        
        res.status(200).json(dest);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

// modifier 
router.put('/:destinationId',async (req, res)=> {
    try {
        const dest1 = await destination.findByIdAndUpdate(
        req.params.destinationId,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(dest1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// Supprimer 
router.delete('/:destinationId',auth, async (req, res)=> {
    const id = req.params.destinationId;
await destination.findByIdAndDelete(id);
res.json({ message: "destination deleted successfully." });
});

module.exports = router;