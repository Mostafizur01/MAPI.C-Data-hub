const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send('this is research page')
})
route.get('/overview', (req, res) => {
    res.render('overview')
})
route.get('/projects', (req, res) => {
    res.send('this is Projects page')
})

module.exports = route