const executeFunction = require('../executeFunction')

const COMMAND = 'node ./public/code.js'

function executeJavaScript (callback) {
    executeFunction(COMMAND, (output) => {
      return callback(JSON.stringify(output))
    })
  }
  
  module.exports = executeJavaScript
