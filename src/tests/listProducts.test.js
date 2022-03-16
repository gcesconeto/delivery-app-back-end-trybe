/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('Test endpoint GET `/product/list`', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:drop');
      shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
      shell.exec('npx sequelize-cli db:seed:all');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 200 and products list', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).get('/product/list').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Should receive status 401 if token is malformed', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
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