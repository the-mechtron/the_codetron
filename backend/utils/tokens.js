require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.generateAccessToken = (user) => {
  return jwt.sign(
    {userId: user.id},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '15m'}
  )
}

exports.generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
  // Optionally save the refresh token in database
  return refreshToken
}

exports.verifyRefreshToken = (token, callback) => {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, callback)
}
