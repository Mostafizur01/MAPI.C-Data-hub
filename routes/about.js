const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('about')
})
route.get('/our-story', (req, res) => {
    res.render('our-story')
})
route.get('/contact', (req, res) => {
    res.render('contact')
})

module.exports = route