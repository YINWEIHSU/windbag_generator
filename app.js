const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateWindbag = require('./generate_windbag')
const handlebars = require('handlebars')
const app = express()
const port = 3000


// register helper
handlebars.registerHelper('ifEquals', function (position, checked, options) {
  return (position === checked) ? options.fn(this) : options.inverse(this)
})

//setting template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const position = req.body.flexRadioDefault
  if (!position) {
    const empty = 'true'
    res.render('index', { empty })
  } else {
    const windBag = generateWindbag(position)
    res.render('index', { windBag, position })

  }
})

//start the express server and listening for connections
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})


