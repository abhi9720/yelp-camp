const express  =  require('express');
const router  = express.Router({mergeParams:true}); // we need to merge 
const { validateReview, isLoggedIn,iReviewsAuthor} =  require('../middleware')
const reviews  =    require('../controllers/reviews')
 



//  const {reviewSchema} = require('../validatingSchema') // used for validating data on server side 
// const Campground = require('../models/campground') // require our model 
// const Review  =  require('../models/review');

const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');


router.post('/',validateReview,isLoggedIn, catchAsync( reviews.createReview ))

router.delete('/:reviewId',isLoggedIn,iReviewsAuthor,catchAsync( reviews.deleteReview ))

module.exports=  router;