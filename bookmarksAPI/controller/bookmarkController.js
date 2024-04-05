const express = require('express');
const router = express.Router();
const Bookmarks = require('../model/bookmark');

//INDEX PAGE
router.get('/', function (req, res) {
    Bookmarks.find({})
        .then(bookmarks => 
    res.render('../views/index.ejs', {bookmarks, currentUser: req.session.currentUser}))
})

//DELETE ROUTE
router.delete("/:id", (req, res) => {
    Bookmarks.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/new"))
    .catch(() => res.send('Bookmark not deleted successfully'))
    });

//UPDATE ROUTE
router.put("/:id/edit", async (req, res) => {
    const updateBookmarkInfo = {...req.body, created_by: currentUser._id}
    await Bookmarks.findByIdAndUpdate(req.params.id, updateBookmarkInfo, {new: true})
     .then((bookmark) => res.redirect("/"+ req.params.id )
     );
   });


//CREATE ROUTE
router.post('/', async (req, res) => {
    try{
        currentUser = req.sessions,currentUser
        const newBookmarkInfo= {...req.body, created_by: currentUser._id};
        const newBookmark = await Bookmarks.create(newBookmarkInfo)
        console.log(newBookmark);
        res.redirect('/')
} catch(err) {
    console.log(err);
}
});




module.exports = router