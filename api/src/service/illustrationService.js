const models = require('./../models');
const uuid4 = require('uuid/v3');

class illustrationService {
    async getIllustrations(){
        const allIllustrations = await models.Illustration.find({});
        const illustrations = allIllustrations
            .map((illustration) => ({
                shapes: illustration.shapes,
                name: illustration.name,
                id: illustration._id,
                editedAt: illustration.editedAt
            }));
        return illustrations;
    }

    async createIllustration(name) {
        const newIllustration = new models.Illustration({
            name: name,
            shapes: [],
            editedAt: Date.now()
        });
        const saved = await newIllustration.save();
        return saved;
    }

    async deleteIllustration(id) {
        await models.Illustration.findByIdAndRemove(id);
        return 0;
    }

    async renameIllustration(id, newName){
        const illustration = await models.Illustration.findOne({_id: id});
        illustration.name = newName;
        illustration.editedAt = Date.now();
        await illustration.save();
        return illustration;
    }

    async getShapes(docId){
        const illustration = await models.Illustration.findOne({_id: docId});
        return illustration;
    }

    async setShapes(docId, shapes){
        const illustration = await models.Illustration.findOne({_id: docId});
        illustration.shapes = shapes;
        illustration.editedAt = Date.now();
        await illustration.save();
        return true;
    }

    async addShape(docId, shape){
        const illustration = await models.Illustration.findOne({_id: docId});
        shape.id = uuid4();
        illustration.shapes = [...illustration.shapes, shape];
        illustration.editedAt = Date.now();
        await illustration.save();
        return shape;
    }

    async removeShape(docId, shapeId){
        const illustration = await models.Illustration.findOne({_id: docId});
        illustration.shapes = illustration.shapes
            .filter(shape => shape.id !== shapeId);
        illustration.editedAt = Date.now();
        await illustration.save();
        return true;
    }

    async updateShape(docId, shapeId, newShapeData){
        const illustration = await models.Illustration.findOne({_id: docId});
        illustration.shapes = illustration.shapes
            .map(shape => shape.id === shapeId ? newShapeData : shape);
        illustration.editedAt = Date.now();
        await illustration.save();
        return true;
    }
}

module.exports = illustrationService;