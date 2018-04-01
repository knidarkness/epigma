const mongoose = require('mongoose');

const illustrationSchema = mongoose.Schema({
    shapes: Array,
    name: String,
    editedAt: Number
});


const Illustration = mongoose.model('Illustration', illustrationSchema);

module.exports = Illustration;