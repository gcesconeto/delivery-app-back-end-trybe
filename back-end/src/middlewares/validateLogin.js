const { login } = require('../schemas');

module.exports = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const { error } = login.validate({ name, email, password, role });

  if (error) return next(error);

  next();
};