'use strict'

const express = require('express');
const router = express.Router();
const beareAuth = require('../middleware/bearerAuth.js');

router.get('/secretstuff', beareAuth, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;