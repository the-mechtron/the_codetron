const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const tokens = require('../../utils/tokens')

module.exports = ({email, password, callback}) => {
  User
    .findOne({email})
    .then(user => {
      if (!user) {
        return callback({message: 'No user exists'})
      }
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (!match) {
            return callback({message: 'Invalid Credentials'})
          }
          const accessToken = tokens.generateAccessToken(user)
          const refreshToken = tokens.generateRefreshToken(user)
          return callback({accessToken, refreshToken})
        })
    })
    .catch(err => {
      return callback({message: 'Something went wrong'})
    })
}
