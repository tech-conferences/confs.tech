const path = require('path')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
// Your static pre-build assets folder
app.use(express.static(path.join(__dirname, '..', 'build')))
// Root Redirects to the pre-build assets
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build/index.html'))
})
// Any Page Redirects to the pre-build assets folder index.html that // will load the react app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build/index.html'))
})
app.listen(port, () => {
  console.log('Server is running on port: ', port)
})
