const { NO_CONTENT } = require('http-status-codes').StatusCodes;

const { user } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { role } = req.user;
    const userEmail = req.user.email;
    await user.delete(email, role, userEmail);

    res.status(NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};