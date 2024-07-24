const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const { createUser } = require('../data-access/userDAO'); 
const { createBusiness } = require('../data-access/businessDAQ');

console.log('Auth module loaded'); 


router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
});

router.post('/regbusiness', async (req, res) => {
    try {
        console.log('Regbusiness Reached');
        const userID = req.body;
        const newBusiness = await createBusiness(userID);
    } catch (err) {
        console.error('Error in businessregistration:', err); 
        res.status(500).json({ error: err.message }); 
    }
});

router.post('/login', async (req, res, next) => {
    try {
        console.log('Login route reached');
        const { username, password } = req.body;
        const result = await authService.loginUser(username, password);

        if (result) { 
            console.log('VALID')
            res.json(result);
        }
        else{
            console.log('INVALID')
            res.status(401).json({ error: 'Invalid credentials' }); 
        }
        
    } catch (err) {
        next(err); 
    }
});
module.exports = router;