const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send('this is Admissions page')
})

route.get('/undergraduate', (req, res) => {
    res.send('this is Undergraduate page')
})

route.get('/graduate', (req, res) => {
    res.send('this is Graduate page')
})

module.exports = route