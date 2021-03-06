const models = require('./../models');

class illustrationService {
    async getIllustrations(){
        const allIllustrations = await models.Illustration.find({});
        const illustrations = allIllustrations
            .map((illustration) => ({
                id: illustration._id,
                name: illustration.name,
                editedAt: illustration.editedAt
            }));
        return illustrations;
    }

    async createIllustration(name) {
        const newIllustration = new models.Illustration({
            name,
            shapes: [],
            editedAt: Date.now()
        });
        const illustration = await newIllustration.save();
        return {
            id: illustration._id,
            name: illustration.name,
            editedAt: illustration.editedAt
        };
    }

    async deleteIllustration(id) {
        await models.Illustration.findByIdAndRemove(id);
        return 0;
    }

    async updateIllustration(id, newName){
        const illustration = await models.Illustration.findOne({_id: id});
        if (!illustration) {
            return null;
        }
        illustration.name = newName;
        illustration.editedAt = Date.now();
        await illustration.save();
        return {
            id: illustration._id,
            name: illustration.name,
            editedAt: illustration.editedAt
        };
    }

    async getShapes(docId){
        const illustration = await models.Illustration.findOne({_id: docId});
        return illustration;
    }

    async setShapes(docId, shapes){
        const illustration = await models.Illustration.findOne({_id: docId});
        if (!illustration) {
            return null;
        }
        illustration.shapes = shapes;
        illustration.editedAt = Date.now();
        await illustration.save();
        return illustration;
    }

    async addShape(docId, shape){
        const illustration = await models.Illustration.findOne({_id: docId});
        if (!illustration) {
            return null;
        }
        illustration.shapes = [...illustration.shapes, shape];
        illustration.editedAt = Date.now();
        await illustration.save();
        return illustration;
    }

    async removeShape(docId, shapeId){
        const illustration = await models.Illustration.findOne({_id: docId});
        if (!illustration) {
            return null;
        }
        illustration.shapes = illustration.shapes
            .filter(shape => shape.id !== shapeId);
        illustration.editedAt = Date.now();
        await illustration.save();
        return illustration;
    }

    async updateShape(docId, shapeId, newShapeData){
        const illustration = await models.Illustration.findOne({_id: docId});
        if (!illustration) {
            return null;
        }
        illustration.shapes = illustration.shapes
            .map(shape => shape.id === shapeId ? newShapeData : shape);
        illustration.editedAt = Date.now();
        await illustration.save();
        return illustration;
    }
}

module.exports = illustrationService;