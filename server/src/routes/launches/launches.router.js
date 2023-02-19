const express = require('express');

// calls http request functions from launches controller
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

// parsing and express router function to launchesRouter
const launchesRouter = express.Router();

// parsing launchesRouter function to .get | .post | and | .delete | routes with the http request functions parsed as a parameter
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);


// exports launchedRouter function
module.exports = launchesRouter;