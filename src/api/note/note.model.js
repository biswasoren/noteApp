let mongoose = require('mongoose')
let noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    },
  title: {
    type: String,
    unique: false,
  },
  created_at: {
    type: Date, 
    unique: false,
  },
  note: {
    type: String, 
    unique: false,
  },
  category: {
    type: String, 
    unique: false,
  },
  user: {
    type: String, 
    unique: false,
  }
})
module.exports = mongoose.model('Note', noteSchema)