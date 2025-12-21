const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.send('this snu now pgae')
})

route.get('/news', (req, res) => {
    res.send('this is news page')
})
route.get('/events', (req, res) => {
    res.send('this is events page')
})

module.exports = route