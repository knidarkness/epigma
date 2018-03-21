const mongoose = require('mongoose');

const illustrationSchema = mongoose.Schema({
    paths: Array,
    name: String
});


const Illustration = mongoose.model('Illustration', illustrationSchema);

module.exports = Illustration;