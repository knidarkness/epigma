const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let models = {};

fs
    .readdirSync(__dirname)
    .filter(filename => {
        return (filename.indexOf('.') !== 0) && (filename !== basename) && (filename.slice(-3) === '.js');
    })
    .forEach(filename => {
        const model = require('./' + filename);
        models[model.modelName] = model;
    });

module.exports = models;