const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateWindbag = require('./generate_windbag')
const app = express()
const port = 3000
const target = [
  {
    enName: 'engineer',
    chName: '工程師',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5668/angry-developer.jpg'
  },
  {
    enName: 'designer',
    chName: '設計師',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5667/angry-designer.jpg'
  },
  {
    enName: 'entrepreneur',
    chName: '創業家',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5669/angry-founder.jpg'
  },
]




//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//setting routes
app.get('/', (req, res) => {
  res.render('index', { target })
})

app.post('/', (req, res) => {
  const windBag = generateWindbag(req.body.flexRadioDefault)
  res.render('index', { target, windBag })
})

//start the express server and listening for connections
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})


