// services/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../data-access/userDAO');

async function loginUser(username, password) {
    console.log('Login attempt with username:', username); 

    try {
        const user = await getUserByUsername(username);
        console.log('Users fetched from database:', user); 

        if (user == undefined) {
            console.warn('User not found in database');
            return null;
        }

        if (!user.PASSWORD) {
            console.warn('User object does not contain a password');
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.PASSWORD);  
        console.log('Password match result:', isMatch); 

        if (!isMatch) {
            console.warn('Incorrect password');
            return null;
        }

        const token = jwt.sign({ userId: user.userid }, 'your_secret_key');
        console.log('User successfully logged in, Token generated:', token); 

        return { user, token }; 
    } catch (err) {
        console.error('Error during login:', err);
        return null;
    }
}

module.exports = { loginUser };
