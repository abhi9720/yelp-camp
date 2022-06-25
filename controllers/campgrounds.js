const Campground = require('../models/campground');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const { cloudinary } = require('../cloudinary/');

module.exports.renderMapview = async (req, res) => {
    const campgrounds = await Campground.find({})

    res.render("campgrounds/mapview.ejs", { campgrounds, search: '' })
}

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate({
        path: 'reviews',  // also populating  author of review 
        populate: {
            path: 'author'
        }
    }).populate('author');

    let data = []
    for (let camp of campgrounds) {
        let sum = 0, rating = 0;

        if (camp.reviews.length > 0) {
            for (let r of camp.reviews) {
                sum += r.rating;
            }
            rating = Math.round((sum * 1.0 / camp.reviews.length) * 10) / 10;
        }
        data.push({ ...camp._doc, campRating: rating });
    }

    res.render('campgrounds/index.ejs', { campgrounds: data, search: '' });
}

module.exports.renderNewForm = (req, res) => {

    if (!req.isAuthenticated()) {
        req.flash('error', 'You Must Be signed');
        return res.redirect('/login');
    }
    res.render('campgrounds/new');
}

module.exports.searchGround = async (req, res) => {



    const search = req.body.search || '';


    if (!search) {
        return res.redirect('/campgrounds');
    }


    const data = await Campground.find(
        {
            "$or": [
                { "title": { "$regex": search, "$options": "i" } },
                { "location": { "$regex": search, "$options": "i" } }
            ]
        }
    )

    res.render("campgrounds/index.ejs", {
        title: search + '| search',
        search: search || '',
        campgrounds: data || [],
    })
}







module.exports.createCampground = async (req, res) => {
    // res.send(req.body);// we are not going to see anything if we donot set urlencoded
    //if (!req.body.campground) throw new ExpressError('Invalid CampGround Data ', 400);    
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()


    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;


    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();

    req.flash('success', "Successfully Added New Campground ")
    res.redirect(`/campgrounds/${campground._id}`);


}


module.exports.showCampground = async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findById(id).populate({
        path: 'reviews',  // also populating  author of review 
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', "Campground Doesn't Exists");
        return res.redirect('/campgrounds')
    }




    let sum = 0, rating = 0;

    if (campground.reviews.length > 0) {
        for (let r of campground.reviews) {
            sum += r.rating;
        }
        rating = Math.round((sum * 1.0 / campground.reviews.length) * 10) / 10;
    }
    campground.campRating = rating;



    res.render('campgrounds/show', { campground });
}





module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', "Campground Doesn't Exists");
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground });
}




module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;


    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()





    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });

    campground.geometry = geoData.body.features[0].geometry;

    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }

        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {


    const { id } = req.params;

    const camp = await Campground.findByIdAndDelete(id);

    req.flash('success', 'Successfully Deleted Campground ')
    res.redirect(`/campgrounds`)

}