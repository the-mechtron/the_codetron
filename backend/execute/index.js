const executeFunction = require('./executeFunction')
const languageExecution = require('./language/index')

const saveFile = require('./saveFile')

function executeCode (code, language, callback) {
  saveFile(code, language)
  languageExecution(language, callback)
}

module.exports = executeCode
