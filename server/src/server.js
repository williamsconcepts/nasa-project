const http = require('http');

require('dotenv').config();

const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

// creates a PORT for the server
const PORT = process.env.PORT || 8000;




// creates a http server for the server and parses the app function as the parameter
const server = http.createServer(app);


// asynchronously loads the data from the loadPlanetsData() function before starting the server
async function startServer() {
    await mongoConnect(); 
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`);
    });
    
}

// starts the server
startServer();
// ....




