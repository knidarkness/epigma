const express = require('express');
const router = express.Router();

const path = require('./path');

router.use('/path', path);

module.exports = router;