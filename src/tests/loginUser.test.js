/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('POST `/user/login`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());
    
    it('Should receive status 200 and a token', async () => {
        const response = await request(app).post('/user/login').send(DATA.usrLogin);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('Should receive status 422 if email is invalid', async () => {
        const response = await request(app).post('/user/login')
            .send({ ...DATA.usrLogin, email: 'zebiritaemail.com' });
        expect(response.status).toBe(422);
    });

    it('Should receive status 404 if user is not registered', async () => {
        const response = await request(app).post('/user/login')
            .send({ ...DATA.usrLogin, email: 'zebirita2@email.com' });
        expect(response.status).toBe(404);
    });

    it('Should receive status 422 if password is shorter than 6 characters', async () => {
        const response = await request(app).post('/user/login')
            .send({ ...DATA.usrLogin, password: '12345' });
        expect(response.status).toBe(422);
    });

    it('Should receive status 401 if wrong password', async () => {
        const response = await request(app).post('/user/login')
            .send({ ...DATA.usrLogin, password: '123456' });
        expect(response.status).toBe(401);
    });
});