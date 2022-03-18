const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('GET `/product/list`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 200 and products list', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/product/list').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Should receive status 401 if token is malformed', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/product/list')
            .set('Authorization', token + 1);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 if token is not provided', async () => {
        const response = await request(app).get('/product/list');
        expect(response.status).toBe(401);
    });
});