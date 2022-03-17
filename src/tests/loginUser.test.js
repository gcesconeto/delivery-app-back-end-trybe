/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('POST `/user/login`', () => {
    beforeEach(() => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:create');
        shell.exec('npx sequelize-cli db:migrate');
        shell.exec('npx sequelize-cli db:seed:all');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 200 and a token', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('Should receive status 422 if email is invalid', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'zebiritaemail.com',
            password: '$#zebirita#$',
        });
        expect(response.status).toBe(422);
    });

    it('Should receive status 404 if user is not registered', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'zebirita2@email.com',
            password: '$#zebirita#$',
        });
        expect(response.status).toBe(404);
    });

    it('Should receive status 422 if password is shorter than 6 characters', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '12345',
        });
        expect(response.status).toBe(422);
    });

    it('Should receive status 401 if wrong password', async () => {
        const response = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '123456',
        });
        expect(response.status).toBe(401);
    });
});