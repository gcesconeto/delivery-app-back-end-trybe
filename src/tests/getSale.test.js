const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('GET `/sale/:id`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 200 and full sale', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', token)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;
        
        const response = await request(app).get(`/sale/${id}`)
            .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.products).toBeDefined();
    });

    it('Should receive status 401 when token is malformed', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const createResponse = await request(app)
        .post('/sale/create')
        .set('Authorization', token)
        .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const response = await request(app).get(`/sale/${id}`)
            .set('Authorization', token + 1);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 when token is not provided', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const createResponse = await request(app)
        .post('/sale/create')
        .set('Authorization', token)
        .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const response = await request(app).get(`/sale/${id}`);
        expect(response.status).toBe(401);
    });

    it('Should receive status 404 when sale doesnt exist', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const createResponse = await request(app)
        .post('/sale/create')
        .set('Authorization', token)
        .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const response = await request(app).get(`/sale/${id + 1}`)
            .set('Authorization', token);
        expect(response.status).toBe(404);
    });
});