/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('Test endpoint POST `/user/register`', () => {
    beforeAll(() => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 201 and a token', async () => {
        const response = await request(app).post('/user/register').send({
            name: 'Test Consumer Name',
            email: 'consumer@gmail.com',
            password: 'imAPassword',
        });
        expect(response.status).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    it('Should receive status 422 if name is invalid', async () => {
        const response = await request(app).post('/user/register').send({
            name: 43,
            email: 'consumer@gmail.com',
            password: 'imAPassword',
        });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if name is shorter than 12 characters', async () => {
        const response = await request(app).post('/user/register').send({
            name: 'Test',
            email: 'consumer@gmail.com',
            password: 'imAPassword',
        });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if email is invalid', async () => {
        const response = await request(app).post('/user/register').send({
            name: 'Test Consumer Name',
            email: 'consumer@ gmail.com',
            password: 'imAPassword',
        });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if password is shorter than 6 characters', async () => {
        const response = await request(app).post('/user/register').send({
            name: 'Test Consumer Name',
            email: 'consumer@gmail.com',
            password: 'imA',
        });
        expect(response.status).toBe(422);
    });
});