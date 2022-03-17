const shell = require('shelljs');
const db = require('../database/models');

const resetDB = () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create');
    shell.exec('npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
};

const killDB = () => db.sequelize.close();

module.exports = { resetDB, killDB };