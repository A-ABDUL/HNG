const express = require('express');
const { loginUser, generateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/generate', generateUser);

module.exports = router;
