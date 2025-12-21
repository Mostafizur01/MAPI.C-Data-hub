const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('about')
})
route.get('/our-story', (req, res) => {
    res.send('this is our story page')
})
route.get('/contact', (req, res) => {
    res.send('this is contact page')
})

module.exports = route