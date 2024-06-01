const executeFunction = require('../executeFunction')

const COMMAND = 'python ./public/code.py'

function executePython (callback) {
  executeFunction(COMMAND, (output) => {
    return callback(JSON.stringify(output))
  })
}

module.exports = executePython
