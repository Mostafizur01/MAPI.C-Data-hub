const mongoose = require('mongoose');

const mongooseConnect = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('ERROR: MONGODB_URI is missing from process.env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); 
    }
};

module.exports = mongooseConnect;