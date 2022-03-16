/* eslint-disable max-lines-per-function */
const { request } = require('supertest');
const shell = require('shelljs');
const app = require('../src/api/app');

describe('TEST endpoint POST `/user/register`', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:drop');
      shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    });
  
    it('Should respond with 201 `created` status code', async () => {
        const response = await request(app).post('/user/create').send({
            name: 'strifghbnftbnrng',
            email: 'string@ifggxubib.com',
            password: 'string',
        });
    });
  
//     it('Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', async () => {
      
//     });
});