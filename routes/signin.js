const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()

router.get('/signin', (req, res) => {
    res.render('signin')
})
router.post('/create', async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.redirect('/signup');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/signup');
        }

        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

})

module.exports = router