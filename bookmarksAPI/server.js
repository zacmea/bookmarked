require('dotenv').config()
const path = require('path');
const express = require('express');
const bookmarkControlller = require('./controller/bookmarkController')
const db = require('./database.js');
const app = express();
const cors = require('cors');
const userController = require('./controller/userController');

// MIDDELWARE
// app.use(methodOverride('_method'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(userController)


//MOUNT ROUTES
app.get('/', function (req, res){
    res.send('You are the home page for Bookmarks') 
});

app.get("/seed", function (req, res){
    db.Bookmarks.deleteMany({})
        .then(removedBookmarksData => {
            console.log(`Removed ${removedBookmarksData.deletedCount} bookmarks from the database`)
            db.Bookmarks.insertMany(db.seedBookmarks)
                .then(addedBookmarks=> {
                    console.log(`Added ${addedBookmarks.length} bookmarks to the database`)
                })
        })
    })


// app.use("/", bookmarkControlller)
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT)
});