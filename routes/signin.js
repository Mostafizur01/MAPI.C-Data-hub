const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signin', { error: null });
});

router.post('/', async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.render('signin', { error: 'User not found! Please sign up.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.render('signin', { error: 'Incorrect password! Please try again.' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/'); 
    } catch (err) {
        console.error(err);
        res.status(500).render('signin', { error: 'Something went wrong. Try again.' });
    }
});

module.exports = router;