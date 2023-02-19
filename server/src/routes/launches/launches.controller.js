// FUNCTIONS CALLED FROM THE LAUNCHES MODEL
const { 
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchesWithId,
    abortLaunchById,
  
} = require('../../models/launches.model');

const {
    getPagination,
} = require('../../services/query');


// GETS ALL THE LAUNCHES USING THE HTTP GET REQUEST FUNCTION
async function httpGetAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}


// ADDS NEW LAUNCH USING THE HTTP POST REQUEST FUNCTION
async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    // checks if the launch properties are all filled, else throws an error
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    // checks id the launch date id formatted correctly
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
    });

}

    // adds the new launch if everything is set correctly
    await scheduleNewLaunch(launch);
    console.log(launch);
    return res.status(201).json(launch);
}

// ABORTS LAUNCH REQUESTS
async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    // checks if launch exists with ID else it returns not found
    const existsLaunch = await existsLaunchesWithId(launchId);
    if (!existsLaunch) {
    return res.status(404).json({
        error: 'Launch not found',
    });
  }
 
    // aborts the request if everything is ok
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not Aborted',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}


// exports launches controller functions
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}