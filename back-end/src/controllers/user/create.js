const { CREATED } = require('http-status-codes').StatusCodes;

const { user } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    await user.create({ name, email, password, role });

    res.status(CREATED).end();
  } catch (err) {
    next(err);
  }
};
