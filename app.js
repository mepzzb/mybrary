if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const expressLayouts = require('express-ejs-layouts')
const app = express()

app.set('view engine', 'ejs')
app.set('view options', { delimiter: '?' })
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use('/authors', authorRouter)

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to database')

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch((e) => {
    console.error(e)
  })
