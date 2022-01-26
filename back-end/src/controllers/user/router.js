const express = require('express');

const { user } = require('../../middlewares');

const router = express.Router({ mergeParams: true });

router.post(
  '/register',
  user.create,
  require('./create'),
);
router.post(
  '/login',
  user.login,
  require('./login'),
);
router.get('/list', require('./list'));
router.delete('/delete', require('./delete'));

module.exports = router;
