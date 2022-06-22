const ExpressError = require('./utilities/ExpressError');
const { campgroundSchema, reviewSchema } = require('./validatingSchema') // used for validating data on server side 
const Campground = require('./models/campground');
const Review = require('./models/review');





// check ur loggeed in ot not 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //console.log(req.path ,  req.originalUrl)

        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You Must Be Log-In  first! ');
        return res.redirect('/login');
    }
    // console.log(req);
    next();
}


// check permision 
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You Are not  Authorised')
        return res.redirect(`/campgrounds/${id}`);
    }
    else {
        next();
    }
}


// checking review author 
// check permision 
module.exports.iReviewsAuthor = async (req, res, next) => {

    //our route is campgrounds/:id/reviews/:reviewId
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You Are not  Authorised')
        return res.redirect(`/campgrounds/${id}`);
    }
    else {
        next();
    }
}


// validate server side campground data
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body); // now checking req.body statisfying schema or not 
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);

    }
    else {
        next();
    }
}




//validate server side review data 
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 404);
    }
    else {
        next();
    }
}