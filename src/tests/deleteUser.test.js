/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('DELETE `/user/delete`', () => {
    beforeEach(() => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:create');
        shell.exec('npx sequelize-cli db:migrate');
        shell.exec('npx sequelize-cli db:seed:all');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 204 if admin deleted user successfully', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'adm@deliveryapp.com',
            password: '--adm2@21!!--',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send({
            email: 'zebirita@email.com',
        });
        expect(response.status).toBe(204);
    });

    it('Should receive status 204 if user deleted him/herself', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send({
            email: 'zebirita@email.com',
        });
        expect(response.status).toBe(204);
    });

    it('Should receive status 404 if user is not found', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send({
            email: 'zebirita2@email.com',
        });
        expect(response.status).toBe(404);
    });

    it('Should receive status 401 if not admin and not him/herself', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;

        const response = await request(app).delete('/user/delete').set('Authorization', token)
        .send({
            email: 'adm@deliveryapp.com',
        });
        expect(response.status).toBe(401);
    });
});