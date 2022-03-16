const { user } = require('../../database/models');
const err = require('../../errors/errors');

module.exports = async (email, role, userEmail) => {
  const userFound = await user.findOne({ where: { email } });

  if (!userFound) throw err.NOT_FOUND;
  if (role !== 'administrator' && email !== userEmail) throw err.UNAUTHORIZED;

  await userFound.destroy();
};
