const mongoose = require('mongoose');

const illustrationSchema = mongoose.Schema({
    paths: Array
});


const Illustration = mongoose.model('Illustration', illustrationSchema);

module.exports = Illustration;