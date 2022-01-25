module.exports = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) return res.status(err.status).json(err.message);
  res.status(500).json('Internal Server Error');
};