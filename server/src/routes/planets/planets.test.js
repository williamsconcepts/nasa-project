const request = require('supertest');
const app = require('../../app');

// TEST FOR GET PLANETS REQUEST
describe('Test GET /planets', () => {
    test('it should respond with 201 success', async () => {
        const response = request(app)
        .get('/planets')
        .expect('Content-Type', /json/)
        .expect(201);
    });
});

