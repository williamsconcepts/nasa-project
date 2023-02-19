const path  = require('path');
// requires express module from npm
const express = require('express');
// requires cors module from npm
const cors = require('cors');
// requires morgan module from npm
const morgan = require('morgan');

const api = require('./routes/api');

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

app.use('/v1', api);


// gets and renders the Applications from page in the index.html file using /*
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// exports the app functions
module.exports = app;