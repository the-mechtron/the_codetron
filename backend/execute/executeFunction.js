const exec = require('child_process').exec
const path = require('path')

const executeFunction = (command, callback) => {
  const process = exec(command)
  const output = {
    error: '',
    output: '',
    exitCode: ''
  }
  process.stdout.on('data', (data) => {
    output.error = null
    output.output = data.toString()
  })

  process.stderr.on('data', (data) => {
    output.output = null
    output.error = data.toString()
  })

  process.on('exit', (code) => {
    output.exitCode = code.toString()
    return callback(output)
  })
}

// const executeFunction = (command, callback) => {
//   console.log(command)
//   const path = process.mainModule.path + '\\public'
//   console.log(path)
//   exec('cd', {cwd: path}, _executeFunction(command, callback))
// }

module.exports = executeFunction
