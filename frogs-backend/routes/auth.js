const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const { createUser } = require('../data-access/userDAO'); 

console.log('Auth module loaded'); 

// Registration route
router.post('/register', async (req, res) => {
    try {
        console.log('Register route reached');
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in registration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

module.exports = router;