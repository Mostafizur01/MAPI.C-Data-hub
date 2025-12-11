const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const index = require('./routes/index')
const signup = require('./routes/signup')
const login = require('./routes/login')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', index)
app.get('/signin', login)
app.get('/signup', signup)


app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})