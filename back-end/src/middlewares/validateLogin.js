const Joi = require('joi');

const schema = Joi.object(
  {
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string(),
  },
);

module.exports = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    error.status = 422;
    return next(error);
  }

  next();
};