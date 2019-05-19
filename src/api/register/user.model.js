let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: false,
  },
  password: {
    type: String, 
    unique: false,
  }
})
module.exports = mongoose.model('User', userSchema)