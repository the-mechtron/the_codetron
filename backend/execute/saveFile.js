const fs = require('fs')

const SAVE_PATH = './public/code'

const EXTENSIONS = {
  cpp: '.cpp',
  javascript: '.js',
  typescript: '.ts',
  python: '.py',
  java: '.java'
}

// Code should be sanitized before sending here.
function saveFile (code, language) {
  const path = SAVE_PATH + EXTENSIONS[language]
  fs.writeFile(path, code, err => {
    if (err) console.log(err)
  })
}

module.exports = saveFile
