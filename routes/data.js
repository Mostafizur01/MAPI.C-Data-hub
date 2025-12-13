const express = require('express')
const route = express.Router()

route.get('/data', (req, res) => {
    res.render('data')
})

module.exports = route