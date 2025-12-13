const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },
    regNumber: {
        type: Number,
        require: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    enrolledDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);