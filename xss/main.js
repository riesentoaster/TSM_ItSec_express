const bodyParser = require('body-parser')
const express = require('express')
const { JSDOM } = require('jsdom')
const createDOMPurify = require('dompurify')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<a href="/xss">go to xss demonstration </a>')
})

app.get('/xss', (req, res) => {
  const xssSiteContent = 
  `
  <div>
    <h1>xss demonstration</h1>
    <h3>enter your favorite color</h3>
    
    <form action="/safe-handler" method="post">
    <label>
      Sanitized
      <input type="text" placeholder="green" name="data" required>
      </label>
      <input type="submit" value="Submit to safe handler">
    </form>

    <form action="/unsafe-handler" method="post">
      <label>
        Non sanitized
        <input type="text" placeholder="red" name="data" required>
      </label>
      <input type="submit" value="Submit to unsafe handler">
    </form>
  </div>
  `
  res.send(xssSiteContent)
})

app.post('/unsafe-handler', (req, res) => {
  const nonSanitized = req.body.data
  res.send(nonSanitized)
})

app.post('/safe-handler', (req, res) => {
  const window = new JSDOM('').window
  const DOMPurify = createDOMPurify(window)
  const sanitized = DOMPurify.sanitize(req.body.data)
  res.send(sanitized)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})