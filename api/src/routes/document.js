const express = require('express');
const router = express.Router();

const models = require('./../models');

router.get('/', async (req, res) => {
    const illustrations = await models.Illustration.find({});
    const namedIllustrations = illustrations
        .map((illustration, id) => ({
            paths: illustration.paths,
            name: illustration.name,
            id: illustration._id
        }));
    res.json(
        {
            documents: namedIllustrations
        }
    );
});

router.post('/', async (req, res) => {
    const newIllustration = new models.Illustration({
        name: req.body.name,
        paths: []
    });
    const savedIllustration = await newIllustration.save();
    console.log(savedIllustration);
    res.json({
        data: savedIllustration
    });
});

module.exports = router;