// requires path module from npm
const path  = require('path');
// requires express module from npm
const express = require('express');
// requires cors module from npm
const cors = require('cors');
// requires morgan module from npm
const morgan = require('morgan');

// calls the planetsRouter function from the routes/planets/planets.router
const planetsRouter = require('./routes/planets/planets.router');
// calls the launchesRouter function from the routes/launches/launches.router
const launchesRouter = require('./routes/launches/launches.router');

// assigns the app constant to express
const app = express();

// using the cors npm package to provide a connect/express middleware that enables cross-origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
}));

// using the morgan npm package "combined" to provide log error responses
app.use(morgan('combined'));

// the express.json() function Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// using the express.static() function to serve static files and using the path.join() function to call the file from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// calls and uses the planetsRouter function from the planets/planets.router
app.use('/planets',planetsRouter);

// calls and uses launchesRouter function from the launches/launches.router
app.use('/launches',launchesRouter);

// gets and renders the Applications from page in the index.html file using /*
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// exports the app functions
module.exports = app;