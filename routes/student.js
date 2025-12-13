const express = require('express')
const route = express.Router()

route.get('/student', (req, res) => {
    res.render('student')
})

module.exports = route