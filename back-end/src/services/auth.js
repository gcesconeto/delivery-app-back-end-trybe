const jwt = require('jsonwebtoken');

const jwtKey = require('fs')
  .readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

module.exports.generateJwt = (payload) => jwt.sign(payload, jwtKey, { expiresIn: '7d' });

module.exports.verifyJwt = (token) => jwt.verify(token, jwtKey);
