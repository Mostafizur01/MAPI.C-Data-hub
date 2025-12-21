const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send('this is campus life page')
})
route.get('/clubs', (req, res) => {
    res.send('thsi is clubs page')
})
route.get('/housing', (req, res) => {
    res.send('this is housing page')
})

module.exports = route