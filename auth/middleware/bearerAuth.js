'use strict';

const { User } = require('../models/index.js')
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "Manal Secret";

const bearerAuth = async (req, res, next) => {
    if (req.headers['authorization'])
        try {
            let bearerHead = req.headers.authorization.split(' ');
            let token = bearerHead.pop();
            console.log('Token >>> ', token);
            if (token) {
                const parsedToken = JWT.verify(token, SECRET);
                const user = await User.findOne({ where: { username: parsedToken.username } });
                console.log("user :" + user.username)
                if (user.username) {
                    req.token = parsedToken;
                    req.user = user;
                    next();
                } else {
                    res.status(403).send('invalid login user')
                }
            }
        }
        catch (error) {

            res.status(403).send('invalid login token')
        }
    else {
        res.status(403).send('no token here')
    }

}
module.exports = bearerAuth;


