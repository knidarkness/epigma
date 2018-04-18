const express = require('express');
const router = express.Router();

const IllustrationService = require('./../service/illustrationService');
const illustrationService = new IllustrationService();

router.get('/', async (req, res) => {
    const namedIllustrations = await illustrationService.getIllustrations()
        .catch(() => {
            res.status(500).send();
        });
    res.json(namedIllustrations);
});

router.post('/', async (req, res) => {
    const newIllustration = await illustrationService.createIllustration(req.body.name)
        .catch(() => {
            res.status(500).send();
        });
    res.status(201).json(newIllustration);
});

router.delete('/:documentId/', async (req, res) => {
    await illustrationService.deleteIllustration(req.params.documentId)
        .catch(() => {
            res.status(500).send();
        });
    res.status(200).send();
});

router.patch('/:documentId', async (req, res) => {
    const illustration = await illustrationService.updateIllustration(req.params.documentId, req.body.name)
        .catch(() => {
            res.status(500).send();
        });
    if (!illustration) {
        res.status(404).send();
    } else {
        res.json(illustration);
    }
});

router.get('/:documentId/shapes', async (req, res) => {
    const illustration = await illustrationService.getShapes(req.params.documentId)
        .catch(() => {
            res.status(500).send();
        });
    if (!illustration) {
        res.status(404).send();
    } else {
        res.json(illustration.shapes);
    }
});

router.put('/:documentId/shapes', async (req, res) => {
    const saved = await illustrationService.setShapes(req.params.documentId, req.body)
        .catch(() => {
            res.status(500).send();
        });
    if (saved) {
        res.status(204).send();
    }
});

router.post('/:documentId/shapes', async (req, res) => {
    await illustrationService.addShape(req.params.documentId, req.body)
        .catch(() => {
            res.status(500).send();
        });
    res.status(201).send();

});

router.put('/:documentId/shapes/:shapeId', async (req, res) => {
    await illustrationService.updateShape(req.params.documentId, req.params.shapeId, req.body)
        .catch(() => {
            res.status(500).send();
        });
    res.status(200).send();
});

router.delete('/:documentId/shapes/:shapeId', async (req, res) => {
    await illustrationService.removeShape(req.params.documentId, req.params.shapeId)
        .catch(() => {
            res.status(500).send();
        });
    res.status(200).send();
});

module.exports = router;