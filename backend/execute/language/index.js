const executeCpp = require('./executeCpp')
const executeJavaScript = require('./executeJavaScript')
const executePython = require('./executePython')

const _languageExecution = {
  'cpp': executeCpp,
  'javascript': executeJavaScript,
  'python': executePython
}

function languageExecution (language, callback) {
  _languageExecution[language](callback)
}

module.exports = languageExecution
