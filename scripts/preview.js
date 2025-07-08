/* eslint-disable space-before-function-paren */
'use strict'

const fs = require('fs')
const path = require('path')

const express = require('express')
const chalk = require('react-dev-utils/chalk')
const openBrowser = require('react-dev-utils/openBrowser')

const paths = require('../config/paths')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

// Check if build directory exists
if (!fs.existsSync(paths.appBuild)) {
  console.log(chalk.red('Build directory not found.'))
  console.log(chalk.red('Please run "npm run build" first.'))
  process.exit(1)
}

const app = express()

// Serve static files from the build directory
app.use(express.static(paths.appBuild))

// Handle client-side routing by serving index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(paths.appBuild, 'index.html'))
})

app.listen(DEFAULT_PORT, HOST, () => {
  console.log(
    chalk.green(
      `Preview server is running at ${chalk.cyan(
        `http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${DEFAULT_PORT}`,
      )}`,
    ),
  )
  console.log(chalk.green('Serving files from build directory'))
  console.log()

  // Open browser
  const url = `http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${DEFAULT_PORT}`
  openBrowser(url)

  console.log('Press Ctrl+C to stop the server')
})

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nShutting down preview server...'))
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\nShutting down preview server...'))
  process.exit(0)
})
