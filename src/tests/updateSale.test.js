const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('PUT `/sale/update/:id`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 200 when seller updates newsale once', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const sellerLoginResponse = await request(app).post('/user/login').send(DATA.sellerLogin);
        const sellerToken = sellerLoginResponse.body.token;
        
        const response = await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        expect(response.status).toBe(200);
    });

    it('Should receive status 200 when seller updates newsale twice', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const sellerLoginResponse = await request(app).post('/user/login').send(DATA.sellerLogin);
        const sellerToken = sellerLoginResponse.body.token;

        await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        const response = await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        expect(response.status).toBe(200);
    });

    it('Should receive status 200 when user updates newsale after seller', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const sellerLoginResponse = await request(app).post('/user/login').send(DATA.sellerLogin);
        const sellerToken = sellerLoginResponse.body.token;

        await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        const response = await request(app).put(`/sale/update/${id}`)
            .set('Authorization', userToken);
        expect(response.status).toBe(200);
    });

    it('Should receive status 401 when user updates before seller', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;
        
        const response = await request(app).put(`/sale/update/${id}`)
            .set('Authorization', userToken);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 when seller updates newsale three times', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const sellerLoginResponse = await request(app).post('/user/login').send(DATA.sellerLogin);
        const sellerToken = sellerLoginResponse.body.token;
        await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        const response = await request(app).put(`/sale/update/${id}`)
            .set('Authorization', sellerToken);
        expect(response.status).toBe(401);
    });

    it('Should receive status 404 when sale doesnt exist', async () => {
        const userLoginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const userToken = userLoginResponse.body.token;

        const createResponse = await request(app)
            .post('/sale/create')
            .set('Authorization', userToken)
            .send(DATA.newSale);
        const id = createResponse.body.newSaleId;

        const sellerLoginResponse = await request(app).post('/user/login').send(DATA.sellerLogin);
        const sellerToken = sellerLoginResponse.body.token;
        
        const response = await request(app).put(`/sale/update/${id + 1}`)
            .set('Authorization', sellerToken);
        expect(response.status).toBe(404);
    });
});