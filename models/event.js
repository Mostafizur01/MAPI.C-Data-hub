const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('event', eventSchema);