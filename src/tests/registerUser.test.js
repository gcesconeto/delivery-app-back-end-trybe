const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('POST `/user/register`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 201 and a token', async () => {
        const response = await request(app).post('/user/register').send(DATA.newUser);
        expect(response.status).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it('Should receive status 422 if name is invalid', async () => {
        const response = await request(app).post('/user/register')
            .send({ ...DATA.newUser, name: 43 });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if name is shorter than 12 characters', async () => {
        const response = await request(app).post('/user/register')
            .send({ ...DATA.newUser, name: 'Test' });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if email is invalid', async () => {
        const response = await request(app).post('/user/register')
            .send({ ...DATA.newUser, email: 'consumer@ gmail.com' });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if password is shorter than 6 characters', async () => {
        const response = await request(app).post('/user/register')
            .send({ ...DATA.newUser, password: 'imA' });
        expect(response.status).toBe(422);
    });
});