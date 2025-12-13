const express = require('express')
const route = express.Router()

route.get('/teacher', (req, res) => {
    res.render('teacher')
})

module.exports = route