const express = require('express');
const router = express.Router();

const document = require('./document');
const path = require('./path');

router.use('/path', path);
router.use('/document', document);

module.exports = router;