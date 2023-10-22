require('dotenv').config()
const https = require('https')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const express = require('express')


const port = 8000
const app = express()
const options = {
  key: fs.readFileSync(path.resolve('certs', 'key.pem')),
  cert: fs.readFileSync(path.resolve('certs', 'cert.pem')),
  passphrase: process.env.PASSPHRASE
}
const server = https.createServer(options, app)


app.use(helmet())
app.use((req, res, next) => {
  if (req.secure) {
    next()
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`)
  }
})

app.get('/', (req, res) => {
  res.send('connected via https')
})

server.listen(port, () => {
  console.log(`Express https app listening on port ${port}`)
})