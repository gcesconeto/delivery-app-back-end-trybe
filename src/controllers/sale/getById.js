const { OK } = require('http-status-codes').StatusCodes;

const { sale } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const found = await sale.getById(id);
    res.status(OK).json(found);
  } catch (err) {
    next(err);
  }
};