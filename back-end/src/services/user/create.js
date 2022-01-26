const md5 = require('md5');

const { user } = require('../../database/models');
const err = require('../../errors/errors');

module.exports = async ({ name, email, password, role }) => {
    if (await user.findOne({ where: { email } })) throw err.ALREADY_EXISTS;

    const createdUser = await user.create({
      name,
      email,
      password: md5(password),
      role,
    });

    return createdUser;
};