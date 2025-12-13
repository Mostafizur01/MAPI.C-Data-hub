const express = require('express')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router()

router.get('/signup', (req, res) => {
    res.render('signup')
})
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('email, and password are required');
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.redirect('/signin');
        }
        user = new User({ name, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, 'your_jwt_secret', { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router