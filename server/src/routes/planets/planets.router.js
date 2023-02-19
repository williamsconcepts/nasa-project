const express = require('express');

// gets all planets from planets controller
const {
    httpGetAllPlanets,
} = require('./planets.controller');

// parsing and express router function to planetsRouter
const planetsRouter = express.Router();

// parsing planetsRouter function to .get route with the http request functions parsed as a parameter
planetsRouter.get('/', httpGetAllPlanets);


// exports planetsRouter
module.exports = planetsRouter;