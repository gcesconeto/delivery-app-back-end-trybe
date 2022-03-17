/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('GET `/user/list`', () => {
    beforeEach(() => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:create');
        shell.exec('npx sequelize-cli db:migrate');
        shell.exec('npx sequelize-cli db:seed:all');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 200 and users list', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'adm@deliveryapp.com',
            password: '--adm2@21!!--',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/user/list').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
    });

    it('Should receive status 401 if user is not admin', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/user/list').set('Authorization', token);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 if token is malformed', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'adm@deliveryapp.com',
            password: '--adm2@21!!--',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/user/list').set('Authorization', token + 1);
        expect(response.status).toBe(401);
    });

    it('Should receive status 401 if token is not provided', async () => {
        const response = await request(app).get('/user/list');
        expect(response.status).toBe(401);
    });
});