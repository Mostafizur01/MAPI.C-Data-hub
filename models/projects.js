const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    headline: String,
    details: String,
    photo: String,
    link: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Project', projectSchema);