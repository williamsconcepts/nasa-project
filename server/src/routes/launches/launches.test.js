const request = require('supertest');
const app = require('../../app');
const { loadPlanetsData } = require('../../models/planets.model');
const {
     mongoConnect,
     mongoDisconnect,
     } = require('../../services/mongo');

const {
    loadPlanetsData,
} = require('../../models/planets.model');

describe('Launches API', () => {
    // beforeAll(() => jest.setTimeout(90 * 1000));

    beforeAll (async () => {
       await mongoConnect();
       await loadPlanetsData();
       jest.setTimeout(90 * 1000);   
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
    test('it should respond with 201 success', async () => {
        const response = request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(201);
    });
});


// TEST FOR POST LAUNCHES REQUEST
describe('Test POST /launch', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        launchDate: 'zoot',
    }


test('it should respond with 201 created', async () => {
    const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
});

test('it should catch missing required properties', async () => {
    const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

    expect(response.body).toStrictEqual({
    error: 'Missing required launch property',
    });
});

test('it should catch invalid dates', async () => {
    const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

    expect(response.body).toStrictEqual({
    error: 'Invalid launch date',
    });
 });    

});
});

