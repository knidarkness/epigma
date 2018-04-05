const express = require('express');
const router = express.Router();

const IllustrationService = require('./../service/illustrationService');
const illustrationService = new IllustrationService();

router.get('/', async (req, res) => {
    const namedIllustrations = await illustrationService.getIllustrations();
    res.json({
        documents: namedIllustrations
    });
});

router.post('/', async (req, res) => {
    const newIllustration = await illustrationService.createIllustration(req.body.name);
    res.json({
        data: newIllustration
    });
});

router.delete('/:documentId/', async (req, res) => {
    await illustrationService.deleteIllustration(req.params.documentId);
    res.status(200).send();
});

router.patch('/:documentId', async (req, res) => {
    const illustration = await illustrationService.renameIllustration(req.params.documentId, req.body.name);
    res.json(illustration);
});


router.get('/:documentId/shapes', async (req, res) => {
    const illustration = await illustrationService.getShapes(req.params.documentId);
    console.log(illustration.shapes);
    res.json({
        shapes: illustration.shapes
            .map(shape => shape.nodes)
    });
});


router.put('/:documentId/shapes', async (req, res) => {
    const saved = await illustrationService.setShapes(req.params.documentId, req.body.shapes);
    if (saved){
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});
module.exports = router;