const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  bookmarks: [{type: mongoose.Types.ObjectId, ref: 'Bookmarks'}]
}, {
  timestamps: true, 
  toJSON: {
      transform: function(doc, ret){
          delete ret.password
          return ret
}
  }
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 6)
  return next()
})

const User = mongoose.model('Users', userSchema)
module.exports = User;