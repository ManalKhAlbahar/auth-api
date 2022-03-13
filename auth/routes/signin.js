const express = require('express');
const router = express.Router();
const basicAuth =require('../middleware/basicAuth.js')

router.post ('/signin',basicAuth ,(req, res) => {


});

module.exports = router;