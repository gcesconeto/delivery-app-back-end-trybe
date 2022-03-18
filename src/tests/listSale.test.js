const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('GET `/sale/list`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 200 and sale list', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', token)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;
        
        const response = await request(app).get('/sale/list')
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(id);
    });

    it('Should receive status 401 when token is malformed', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        await request(app)
        .post('/sale/create')
        .set('Authorization', token)
        .send(DATA.newSale);

        const response = await request(app).get('/sale/list')
            .set('Authorization', token + 1);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 when token is not provided', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        await request(app)
        .post('/sale/create')
        .set('Authorization', token)
        .send(DATA.newSale);

        const response = await request(app).get('/sale/list');
        expect(response.status).toBe(401);
    });

    it('Should receive status 200 and empty array when there are no sales', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/sale/list')
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    });
});