const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODBURI)
const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
})

module.exports = {
   Bookmarks: require('./model/bookmark'),
   Users: require('./model/user'),
   seedBookmarks: require('./bookmarkSeed.js'),
}
