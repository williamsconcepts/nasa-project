const mongoose = require('mongoose');

// connecting the mongoDB database
const MONGO_URL = 'mongodb+srv://boobae:ebubedike@nasa-api.mufvbej.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection opened!')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}