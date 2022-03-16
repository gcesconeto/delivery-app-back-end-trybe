/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines-per-function */
const request = require('supertest');
const shell = require('shelljs');
const app = require('../api/app');
const db = require('../database/models');

describe('Test endpoint POST `/sale/create`', () => {
    beforeEach(() => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
        shell.exec('npx sequelize-cli db:seed:all');
    });

    afterAll(() => {
        db.sequelize.close();
    });

    it('Should receive status 201 and newSaleId', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;
        const response = await request(app)
            .post('/sale/create')
            .set('Authorization', token)
            .send({
                userEmail: 'zebirita@email.com',
                sellerEmail: 'fulana@deliveryapp.com',
                totalPrice: 651,
                deliveryAddress: 'address',
                deliveryNumber: 651981,
                products: [
                    { productId: 1, quantity: 2 },
                    { productId: 2, quantity: 4 },
                ],
            });
        expect(response.status).toBe(201);
        expect(response.body.newSaleId).toBeDefined();
    });

    it('Should receive status 422 if userEmail is invalid', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;
        const response = await request(app)
            .post('/sale/create')
            .set('Authorization', token)
            .send({
                userEmail: 'zebiritaemail.com',
                sellerEmail: 'fulana@deliveryapp.com',
                totalPrice: 651,
                deliveryAddress: 'address',
                deliveryNumber: 651981,
                products: [
                    { productId: 1, quantity: 2 },
                    { productId: 2, quantity: 4 },
                ],
            });
        expect(response.status).toBe(422);
    });

    it('Should receive status 422 if sellerEmail is invalid', async () => {
        const loginResponse = await request(app).post('/user/login').send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
        });
        const { body: { token } } = loginResponse;
        const response = await request(app)
            .post('/sale/create')
            .set('Authorization', token)
            .send({
                userEmail: 'zebirita@email.com',
                sellerEmail: 'fulanadeliveryapp.com',
                totalPrice: 651,
                deliveryAddress: 'address',
                deliveryNumber: 651981,
                products: [
                    { productId: 1, quantity: 2 },
                    { productId: 2, quantity: 4 },
                ],
            });
        expect(response.status).toBe(422);
    });
});