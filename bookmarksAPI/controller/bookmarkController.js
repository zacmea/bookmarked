const express = require('express');
const router = express.Router();
const Bookmarks = require('../model/bookmark');

//INDEX PAGE
router.get('/', function (req, res) {
    Bookmarks.find({})
        .then(bookmarks => 
    res.json({bookmarks}))
})

//DELETE ROUTE
router.delete("/:id", (req, res) => {
    Bookmarks.findByIdAndDelete(req.params.id)
    .then(() => res.send("Bookmark deleted successfully"))
    .catch(() => res.send('Bookmark not deleted successfully'))
    });

//UPDATE ROUTE
router.put("/:id", async (req, res) => {
    const updateBookmarkInfo = {...req.body}
    await Bookmarks.findByIdAndUpdate(req.params.id, updateBookmarkInfo, {new: true})
     .then((bookmark) => res.json(bookmark)
     );
   });


//CREATE ROUTE
router.post('/', async (req, res) => {
    try{
        currentUser = req.session.currentUser
        console.log(req.session);
        const newBookmarkInfo= {...req.body}
        const newBookmark = await Bookmarks.create(newBookmarkInfo)
        res.json({newBookmark})
        console.log(newBookmark);
        
} catch(err) {
    console.log(err);
}
});




module.exports = router