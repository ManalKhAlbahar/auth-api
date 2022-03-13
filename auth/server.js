'use strict';

const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const signinRouter = require('./routes/signin.js');
const signupRouter = require('./routes/signup.js');
const secretRouter = require('./routes/secret.js');
const v1Route = require('./routes/v1Route');
const v2Route = require('./routes/v2Route');
const userRouter = require('./routes/user');
const app = express();
app.use(express.json());
app.use(cors());
app.use(signinRouter);
app.use(signupRouter);
app.use(secretRouter);
app.use(userRouter);
app.use('/api/v1', v1Route);
app.use('/api/v2', v2Route);

app.get('/', (req, res) => {
    res.send('Home Route')
})



app.use(errorHandler);
app.use('*', notFound);


function start(port) {
    app.listen(port, () => {
        console.log(`welcome we are running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start,
}
