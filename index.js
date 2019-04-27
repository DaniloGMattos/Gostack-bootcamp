const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')
nunjucks.configure('views', {
  express: app,
  autoscape: true,
  watch: true
})
const age = []
app.get('/', (req, res) => {
  return res.render('home')
})
const isEmpty = (req, res, next) => {
  console.log('Ridirected')
  return req.body.age === undefined ? next() : res.redirect('/')
}

app.post('/check', isEmpty, (req, res) => {
  console.log(req.body)
  age.push(req.body.age)
  return req.body.name >= 18 ? res.redirect('/minor') : res.redirect('/major')
})

app.get('/minor', (req, res) => {
  return res.render('minor', { age })
})

app.get('/major', (req, res) => {
  return res.render('major', { age })
})
app.listen(3000)
