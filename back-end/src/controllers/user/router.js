const express = require('express');

const router = express.Router({ mergeParams: true });

router.post('/register', require('./create'));
router.post('/login', require('./login'));
router.get('/list', require('./list'));
router.delete('/delete', require('./delete'));

module.exports = router;
