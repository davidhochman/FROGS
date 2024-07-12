const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err); 
  }
});

module.exports = router;