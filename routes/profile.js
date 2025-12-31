const express = require('express');
const router = express.Router();
const Event = require('../models/event'); 
const User = require('../models/user'); 
const isUser = require('../middleware/isuser');
const bcrypt = require('bcryptjs');

router.get('/', isUser, async (req, res) => {
    try {
        const userData = req.user; 

        const currentUser = await User.findOne({ email: userData.email });

        if (!currentUser) {
            return res.redirect('/signin');
        }

        const events = await Event.find().sort({ createdAt: -1 }).limit(6);

        res.render('profile', { 
            user: currentUser, 
            events: events,
        });

    } catch (err) {
        console.error("Profile Error:", err);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
});

router.get('/edit', isUser, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.render('edit-profile', { user, error: null, success: null });
    } catch (err) {
        res.redirect('/profile');
    }
});

router.post('/edit', isUser, async (req, res) => {
    try {
        const { name, password } = req.body;
        const updateData = { name };

        if (password && password.length >= 6) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        await User.findOneAndUpdate({ email: req.user.email }, updateData);
        
        const updatedUser = await User.findOne({ email: req.user.email });
        res.render('edit-profile', { 
            user: updatedUser, 
            success: 'Profile updated successfully!', 
            error: null 
        });
    } catch (err) {
        res.render('edit-profile', { 
            user: req.user, 
            error: 'Something went wrong!', 
            success: null 
        });
    }
});

module.exports = router;