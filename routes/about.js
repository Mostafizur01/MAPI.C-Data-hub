const express = require('express')
const route = express.Router()

route.get('/about', (req, res) => {
    res.render('about')
})

module.exports = route