'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models/index.js')
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "Manal Secret";

const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            console.log("Auth: " + req.headers.authorization)
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const user = await User.findOne({ where: { username: username } });
            var validPass = await bcrypt.compare(password, user.password);
            if (validPass) {
                req.user = user
                let newToken = JWT.sign({ username: user.username }, SECRET, { expiresIn: 120000 });//20min
                user.token = newToken;
                res.status(200);//.json(user)
            } else {
                res.status(403).send("invalid login Password");
            }
        }
    } catch (error) {
        res.status(403).send("invalid login Username")
    }

}

module.exports = basicAuth;