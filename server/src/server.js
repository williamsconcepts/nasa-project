const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');

// requires loadPlanetsData from the planets.module directory
const { loadPlanetsData } = require('./models/planets.model');

// creates a PORT for the server
const PORT = process.env.PORT || 8000;




// creates a http server for the server and parses the app function as the parameter
const server = http.createServer(app);


// asynchronously loads the data from the loadPlanetsData() function before starting the server
async function startServer() {
    await mongoConnect(); 
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`);
    });
    
}

// starts the server
startServer();
// ....




