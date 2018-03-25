const express = require('express');
const router = express.Router();

const models = require('./../models');

router.use((req, res, next) => {
    console.log(req.url);
    next();
});

router.get('/', async (req, res) => {
    const illustrations = await models.Illustration.find({});
    const namedIllustrations = illustrations
        .map((illustration, id) => ({
            paths: illustration.paths,
            name: illustration.name,
            id: illustration._id,
            editedAt: illustration.editedAt
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
        paths: [],
        editedAt: Date.now()
    });
    const savedIllustration = await newIllustration.save();
    console.log(savedIllustration);
    res.json({
        data: savedIllustration
    });
});

router.patch('/:documentId', async (req, res) => {
    const illustration = await models.Illustration.findOne({_id: req.params.documentId});
    illustration.name = req.body.name;
    illustration.editedAt = Date.now();
    illustration.save((err) => {
        if (err){
            console.log(err);
            res.status(500).send();
        } else {
            res.json(illustration);
        }
    })
});

router.delete('/:documentId/', async (req, res) => {
    await models.Illustration.findByIdAndRemove(req.params.documentId, (err, todo) => {

    });
    res.status(200).send();
});

router.get('/:documentId/paths', async (req, res) => {
    const illustrations = await models.Illustration.find({_id: req.params.documentId});
    res.json(illustrations[0]);
});


router.put('/:documentId/paths', async (req, res) => {
    const paths = req.body.paths.map(p => p.path);
    const illustrations = await models.Illustration.find({_id: req.params.documentId});
    illustrations[0].paths = paths;
    illustrations[0].editedAt = Date.now();
    illustrations[0].save((err, upd) => {
        console.log('saved 1');
        res.status(200).send();
    });
});
module.exports = router;