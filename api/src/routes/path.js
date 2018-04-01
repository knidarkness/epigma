const express = require('express');
const models = require('./../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const illustrations = await models.Illustration.find({});
    res.json(illustrations[0]);
});

router.put('/', async (req, res) => {
    const shapes = req.body.shapes.map(shape => shape.nodes);
    const illustrations = await models.Illustration.find({});
    illustrations[0].shapes = shapes;
    illustrations[0].save((err, upd) => {
        res.status(200).send();
    });
});

module.exports = router;