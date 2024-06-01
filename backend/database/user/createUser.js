const User = require('../../models/User')
const bcrypt = require('bcryptjs')

const saveUserToDB = ({ name, email, password, callback }) => {
  User
    .findOne({email})
    .then(user => {
      if (user) {
        return callback({message: 'User already exists!!'})
      }
      const newUser = new User({
        name: name,
        email: email,
        password: password
      })
      newUser
        .save()
        .then(result => callback({message: 'User Created!!'}))
        .catch(err => console.log(err))
    })
}

module.exports = ({ name, email, password, callback }) => {
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      return saveUserToDB({name, email, password: hashedPassword, callback})
    })
    .catch(err => {
      callback({message: 'Something went wrong while singup'})
    })
}
