const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const cookieParser = require('cookie-parser')

const index = require('./routes/index')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const student = require('./routes/student')
const teacher = require('./routes/teacher')
const checkUserToke = require('./middleware/isuser')
const data = require('./routes/data')
const about = require('./routes/about')
const notice = require('./routes/notice')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))



app.use('/', index)
app.use('/', signup)
app.use('/', signin)
app.use('/', about)
app.use('/', checkUserToke, notice)
app.use('/', checkUserToke, student)
app.use('/', checkUserToke, teacher)
app.use('/', checkUserToke, data)


app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})