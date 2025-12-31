const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('campusLife')
})
route.get('/clubs', (req, res) => {
    res.render('clubs')
})
route.get('/housing', (req, res) => {
    res.render('housing')
})

module.exports = route