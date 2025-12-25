
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Admin logout
router.get('/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/auth');
});

// Render admin signup/signin page
router.get('/auth', (req, res) => {
    const token = req.cookies.adminToken;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded && decoded.isAdmin) {
                return res.redirect('/admin/dashboard');
            }
        } catch (e) { /* ignore invalid token */ }
    }
    res.render('adminSignUpAndSignin');
});

// Render admin dashboard (protected)
router.get('/dashboard', (req, res) => {
    const token = req.cookies.adminToken;
    if (!token) return res.redirect('/admin/auth');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) return res.redirect('/admin/auth');
        res.render('adminDashboard', { admin: decoded });
    } catch (err) {
        return res.redirect('/admin/auth');
    }
});

// Register admin (only if no admin exists)
router.post('/register', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.render('adminSignUpAndSignin', { error: 'Admin already exists' });
        }
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.render('adminSignUpAndSignin', { error: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();
        const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('adminToken', token, { httpOnly: true });
        res.redirect('/admin/dashboard');
    } catch (err) {
        res.render('adminSignUpAndSignin', { error: 'Server error' });
    }
});

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.render('adminSignUpAndSignin', { error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.render('adminSignUpAndSignin', { error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('adminToken', token, { httpOnly: true });
        res.redirect('/admin/dashboard');
    } catch (err) {
        res.render('adminSignUpAndSignin', { error: 'Server error' });
    }
});

module.exports = router;
