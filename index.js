'use strict';

require('dotenv').config();

const server = require('./auth/server.js');
const {db} = require('./auth/models/index.js')

    db.sync().then(()=>{
    server.start(process.env.PORT || 3008);})

.catch(console.error) 