// requires the file system
const fs = require('fs');
// requires path module from npm
const path = require('path');
// requires csv-parser module from npm
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');




// checks for habitable planets that meet the function requirements and returns the resulting values as arrays
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

// loads the planets data from the specified file system using the path.join to get the specified file path
function loadPlanetsData() {
 return new Promise((resolve, reject) => {
    // creates a read stream to read the the planets data from the specified file system
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    // the .on Adds the listener function to the end of the listeners array for the event.
    .on('data', async (data) => {
        if (isHabitablePlanet(data)) {  
            savePlanet(data);
        }
    })
    // checks for error
    .on('error', (err) => {
        console.log(err);
        reject(err);
    })
    // logs the count of habitable planets
    .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
    });   
 });
}

// gets and returns all the habitable planets
async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0, '__v': 0,
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
          }, {
            keplerName: planet.kepler_name,
          }, {
            upsert: true,
          });
    } catch (err) {
        console.error(`Could not save planet ${err}`);
    }
   
}

// exports the getAllPlanets and loadPlanetsData function
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
