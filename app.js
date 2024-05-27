const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// BodyParser Middleware
app.use(express.json());

// Cors
app.use(cors());

// Routes
const reservationRouter = require("./routes/reservation.route");
app.use('/api/reservations', reservationRouter);

const destinationRouter = require("./routes/destination.route");
app.use('/api/destinations', destinationRouter);

const forfaitRouter = require("./routes/forfait.route");
app.use('/api/forfaits', forfaitRouter);

const userRouter = require("./routes/user.route");
app.use('/api/users', userRouter);

// Config dotenv
dotenv.config();

// Connexion à la base de données
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("Base de données connectée avec succès !");
    })
    .catch(err => {
        console.error("Impossible de se connecter à la base de données :", err);
        process.exit(1);
    });

// Route de test
app.get("/", (req, res) => {
    res.send("Bonjour !");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
