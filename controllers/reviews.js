const Campground =  require('../models/campground');
const Review =  require('../models/review');

module.exports.createReview =   async(req,res)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review  =  new Review(req.body.review) ;
    console.log( req.body.review);
    review.author =  req.user._id;
    campground.reviews.push(review);

    await review.save();
    await campground.save();
    req.flash('reviewflash','Review Added');
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteReview =  async(req,res)=>{
   
    const {id,reviewId} =  req.params;
 
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}} );// this will delete that specific review from reviews array
    await Review.findByIdAndDelete(reviewId);
    
    req.flash('reviewflash','Review Deleted');
    res.redirect(`/campgrounds/${id}`);
           
 }