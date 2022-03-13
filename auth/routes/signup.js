const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/index.js');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
    let { username, password } = req.body;
    console.log(username + " ,,, " + password)
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing >>> ', hashedPassword)
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;