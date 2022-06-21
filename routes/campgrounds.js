const express = require('express');
const router = express.Router()
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const Campground = require('../models/campground') // require our model 


// fancy way to write routes 
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// .post( upload.array('image'), (req,res)=>{
//     console.log(req.body,req.files)
//     res.send('It Worked')
// })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.get('/mapview', campgrounds.renderMapview)
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, upload.array('image'), isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.post("/search", catchAsync(campgrounds.searchGround))


// router.get('/',catchAsync(  campgrounds.index ) );
// router.post('/',validateCampground, isLoggedIn,catchAsync( campgrounds.createCampground ))

// router.get('/:id',catchAsync( campgrounds.showCampground ))

// router.put('/:id',isLoggedIn, isAuthor ,validateCampground, catchAsync( campgrounds.updateCampground ))

// router.delete('/:id', isLoggedIn,isAuthor, catchAsync( campgrounds.deleteCampground ))


module.exports = router;