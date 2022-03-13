'use strict';
const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearerAuth.js')
const { User } = require('../models/index.js');
router.get('/users',bearerAuth,async(req,res)=>{
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
})

module.exports = router;