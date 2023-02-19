
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;



// DEFAULT SUCCESSFUL LAUNCH MODEL
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);


// DEFAULT LAUNCH WITH ID
async function existsLaunchesWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}


async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

        if (!latestLaunch) {
            return DEFAULT_FLIGHT_NUMBER;
        }

        return latestLaunch.flightNumber;
}

// GETS ALL LAUNCHES
async function getAllLaunches() {
    return await launchesDatabase
    .find({}, { '_id': 0, '__v': 0 });
}


async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found!');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber,
    },  launch, {
        upsert: true,
    });


}


async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero To Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}



// ABORTS LAUNCH BY ID
async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}


// EXPORTS ALL MODEL FUNCTIONS
module.exports = {
    existsLaunchesWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};