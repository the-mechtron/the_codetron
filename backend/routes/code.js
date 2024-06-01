const express = require('express')
const router = express.Router()
const codeController = require('../controllers/code')

router.get('/compile', codeController.getCompileCode)

router.post('/execute', codeController.postExecuteCode)

module.exports = router
