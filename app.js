const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongooseConnect = require('./utils/mongooseConnect')
mongooseConnect()

const index = require('./routes/index')
const signup = require('./routes/signup')
const signin = require('./routes/signin')
const checkUserToke = require('./middleware/isuser')
const data = require('./routes/data')
const notice = require('./routes/notice')
const academics = require('./routes/academics')
const research = require('./routes/research')
const admissions = require('./routes/admissions')
const snuNow = require('./routes/snu-now')
const campusLife = require('./routes/campus-life')
const about = require('./routes/about')
const event = require('./routes/event')
const admin = require('./routes/admin')
const photos = require('./routes/photos')
const news = require('./routes/news')
const projectRouter = require('./routes/research');
const profile = require('./routes/profile')
const logout = require('./routes/logout')

app.use('/notice', notice)
app.use('/data', data)
app.set('view engine', 'ejs')   
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('/signup', signup)
app.use('/signin', signin)
app.use('/academics', academics)
app.use('/research', research);
app.use('/admissions', admissions)
app.use('/snu-now', snuNow)
app.use('/campus-life', campusLife)
app.use('/about', about)
app.use('/event', event)
app.use('/admin', admin)
app.use('/photos', photos)
app.use('/news', news)
app.use('/projects', projectRouter);
app.use('/logout', logout)
app.use('/profile', checkUserToke, profile)
app.use('/', checkUserToke, notice)
app.use('/', checkUserToke, data)


app.listen(port, () => {
    console.log(`server run on http://localhost:${port}`)
})