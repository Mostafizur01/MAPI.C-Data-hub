const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('academics')
})
route.get('/students', (req, res) =>{
    res.send('this is student page')
})
route.get('/teachers', (req, res) => {
    res.send('this is teacher page')
})
route.get('/form', (req, res) => {
    res.send('form submit page')
})

module.exports = route