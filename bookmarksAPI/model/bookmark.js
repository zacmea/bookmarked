const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  created_by: {type: mongoose.Types.ObjectId, ref:"user"}
})

const Bookmarks = mongoose.model('Bookmarks', bookmarkSchema)
module.exports = Bookmarks;