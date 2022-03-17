/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const app = require('../api/app');
const DATA = require('./testData');
const { resetDB, killDB } = require('./toolsDB');

describe('DELETE `/user/delete`', () => {
    beforeEach(() => resetDB());
    afterAll(() => killDB());

    it('Should receive status 204 if admin deleted user successfully', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.admLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send(DATA.usrEmail);
        expect(response.status).toBe(204);
    });

    it('Should receive status 204 if user deleted him/herself', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send(DATA.usrEmail);
        expect(response.status).toBe(204);
    });

    it('Should receive status 404 if user is not found', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send(DATA.wrongEmail);
        expect(response.status).toBe(404);
    });

    it('Should receive status 401 if not admin and not him/herself', async () => {
        const loginResponse = await request(app).post('/user/login').send(DATA.usrLogin);
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send(DATA.admEmail);
        expect(response.status).toBe(401);
    });
});