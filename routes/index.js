const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

    router.use((req, res, next) => {
    const token = req.cookies.token; 
    res.locals.token = token || null;
    next();
});

router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 }).limit(6);
        res.render('index', { events }); 
    } catch (err) {
        res.render('index', { events: [] });
    }
});

module.exports = router;