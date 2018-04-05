const models = require('./../models');

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
        const shapeNodeList = shapes.map(p => p.nodes);
        const illustrations = await models.Illustration.find({_id: docId});
        illustrations[0].shapes = shapes;
        illustrations[0].editedAt = Date.now();
        await illustrations[0].save();
        return true;
    }

    addShape(docId, shape){

    }

    removeShape(docId, shape){

    }

    updateShape(docId, shapeId, newShapeData){

    }
}

module.exports = illustrationService;