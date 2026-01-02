const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('mapi-now')
})

route.get('/news', (req, res) => {
    res.render('news')
})
route.get('/events', (req, res) => {
    res.render('events')
})

module.exports = route