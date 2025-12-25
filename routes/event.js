const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Get all events (for index page, top 6)
// Show all events
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        let admin = null;
        const token = req.cookies && req.cookies.adminToken;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded && decoded.isAdmin) {
                    admin = { isAdmin: true, id: decoded.id };
                }
            } catch (e) { /* ignore invalid token */ }
        }
        res.render('events', { events, admin });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get event details
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');
        res.render('eventDetails', { event, user: req.user });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
