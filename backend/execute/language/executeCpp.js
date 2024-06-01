const executeFunction = require('../executeFunction')

const COMMAND_1 = 'g++ ./public/code.cpp -o ./public/a.exe'
const COMMAND_2 = process.mainModule.path + '\\public\\a.exe'

function executeCpp (callback) {
  executeFunction(COMMAND_1, (output) => {
    if (output.exitCode === '0') {
      executeFunction(COMMAND_2, (output) => {
        return callback(JSON.stringify(output))
      })
    } else {
      return callback(JSON.stringify(output))
    }
  }
  )
}

module.exports = executeCpp
