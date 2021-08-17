const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
	res.render('users/register');
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Welcome to Yelp Camp!');
			res.redirect('/campgrounds');
		});
	} catch (e) {
		req.flash('error', 'User already exists!');
		res.redirect('/register');
	}
};

module.exports.renderLogin = (req, res) => {
	return res.render('users/login');
};

module.exports.login = (req, res) => {
	req.flash('success', `Welcome back! ${req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1)}`);
	const redirectUrl = req.session.returnTo || '/campgrounds'; // if user click on some link then redirct there other wise redirect to campground
	delete req.session.returnTo; // delete returnTo from our session object
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Goodbye!');
	res.redirect('/');
};
