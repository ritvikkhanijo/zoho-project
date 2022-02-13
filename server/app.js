//file imports
require("./config/config");
require("./models/db");
require('./config/passportConfig');

//package imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsIndex);
app.use(passport.initialize());

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//start the app
app.listen(process.env.PORT,()=>{
    console.log(`server started at: ${process.env.PORT}`);
});