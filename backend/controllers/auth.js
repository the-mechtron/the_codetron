// const { createSecretToken } = require('../util/SecretToken')
const createUser = require('../database/user/createUser')
const readUser = require('../database/user/readUser')

exports.postSignup = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  const callback = (data) => {
    return res.json(data)
  }
  createUser({name, email, password, callback})
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const callback = (data) => {
    res.cookie('refreshToken',
      data.refreshToken,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      }
    )
    return res.json(data)
  }
  readUser({email, password, callback})
}

exports.postLogout = (req, res, next) => {
  console.log('logout')
  console.log(req.body)
  res.clearCookie('refreshToken')
  return res.send('Logged Out')
}
