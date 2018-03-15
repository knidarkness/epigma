const express = require('express');
const models = require('./../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const illustrations = await models.Illustration.find({});
    res.json(illustrations[0]);
});

router.put('/', async (req, res) => {
    const paths = req.body.paths.map(p => p.path);
    const illustrations = await models.Illustration.find({});
    illustrations[0].paths = paths;
    illustrations[0].save((err, upd) => {
        res.status(200).send();
    });
//    res.status(200).send();
});

module.exports = router;