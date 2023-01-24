const express = require('express');

const router = express.Router();

//importing the controller page
const {signup, login} = require('../controllers/authentic.js')

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;