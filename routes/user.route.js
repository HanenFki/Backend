const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Register
router.post('/register', async (req, res, )=> {
const{nom,email,motDePasse,role}=req.body;
const user = await User.findOne({ email })
if (user) return res.status(404).send({ success: false, message: "Account already exists" })

const salt=await bcrypt.genSalt(10);
const hash=await bcrypt.hash(motDePasse,salt);
const newUser=new User({
    nom:nom,
email:email,
motDePasse:hash,
role:role,
});
try {
await newUser.save();
return res.status(201).send({ success: true, message: "Account created successfully ", user: newUser })
} catch (error) {
res.status(409).json({ message: error.message });
}
});
//Generate Token
const generateToken=(user) =>{
    return jwt.sign({user}, process.env.TOKEN, { expiresIn: '1 y' });
    }
    //login
    router.post('/login', async (req, res) => {
    try {
    let { email, motDePasse } = req.body
    if (!email || !motDePasse) {
    return res.status(404).send({ success: false, message: "All fields are required" })
    }
    let user = await User.findOne({ email })
    if (!user) {
    return res.status(404).send({ success: false, message: "Account doesn't exists" })
    } else {
    let isMatch = await bcrypt.compare(motDePasse, user.motDePasse)
    if(!isMatch) {res.status(400).json({success: false, message:'Please verify your credentials'}); return;}
    
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
    success: true,
    token,
    refreshToken,
    user
    })
    }
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // Refresh
function generateRefreshToken(user) {
    return jwt.sign({user}, process.env.REFRESH_TOKEN, { expiresIn: '1 y' });
    }
    //Refresh Route
    router.post('/refreshToken', async (req, res, )=> {
    const refreshtoken = req.body.refreshToken;
    if (!refreshtoken) {
    return res.status(404).json({ success: false,message: 'Token Not Found'
    });
    }
    else {
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
    return res.status(406).json({success: false, message:
    'Unauthorized Access' });
    }
    else {
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
    token,
    refreshToken
    })
    }
    });
    }
    
    });
module.exports = router;