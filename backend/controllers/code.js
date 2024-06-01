const fs = require('fs')
const executeCode = require('../execute/index')

exports.getCompileCode = (req, res, next) => {
  res.send('<h1>Logic for compiling the code</h1>')
}

exports.postExecuteCode = (req, res, next) => {
  const code = req.body.code
  const language = req.body.language
  const result = executeCode(code, language, (data) => {
    return res.json(data)
  })
}
