const express = require('express')
const router = express.Router()
const Event = require('../models/event');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 }).limit(6);
        res.render('index', { events });
    } catch (err) {
        res.render('index', { events: [] });
    }
});

module.exports = router