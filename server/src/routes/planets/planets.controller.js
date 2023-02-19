// gets all planets from the planets model
const { getAllPlanets } = require('../../models/planets.model');

// checks if the request was successful and returns ok
async function httpGetAllPlanets(req, res) {
   return res.status(200).json(await getAllPlanets());
}


// exports httpGetAllPlanets function
module.exports = {
    httpGetAllPlanets,
};