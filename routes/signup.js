
const express = require('express')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('signup')
})
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('email, and password are required');
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.redirect('/signin');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/signin');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router