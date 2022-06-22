if (process.env.NODE_ENV != "production{") {
  require("dotenv").config();
}

const express = require("express"); // v
const path = require("path"); // v
const mongoose = require("mongoose"); // v
const ejsMate = require("ejs-mate"); // v
const session = require("express-session"); // v
const ExpressError = require("./utilities/ExpressError");
const flash = require("connect-flash"); // v

const methodOverride = require("method-override"); // override http verb  // v
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// requiring our router
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

const MongoDBStore = require("connect-mongo");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

//
// console.log( );
//   process.env.DB_URL ||
// 'mongodb://localhost:27017/yelp-camp';

// connecting mongoose
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error :")); // testing db connected or not
db.once("open", () => {
  console.log("---------------DataBase Connected -------------- ");
});

const app = express();

// middle-ware
app.engine("ejs", ejsMate); // tell express instead of default one use this one
app.set("view engine", "ejs"); // changing view engine to ejs
app.set("views", path.join(__dirname, "views")); // to void conflict if we call it from some other dir (mean views dir available from every where )

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log(
    "-----------------------SESSION STORE ERROR...............................",
    e
  );
});

const sessionConfig = {
  secret,
  store,
  // store: MongoStore.create({
  //     mongoUrl: dbUrl ,
  //         touchAfter:24*3600,
  //         secret,

  // }),
  name: "session",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com",
  "https://api.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://kit.fontawesome.com",
  "https://cdnjs.cloudflare.com",
  "https://cdn.jsdelivr.net",
  "https://use.fontawesome.com/",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com",
  "https://stackpath.bootstrapcdn.com",
  "https://api.mapbox.com",
  "https://api.tiles.mapbox.com",
  "https://fonts.googleapis.com/css2",
  "https://use.fontawesome.com",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css",
  "https://use.fontawesome.com/",
];
const connectSrcUrls = [
  "https://fonts.gstatic.com",
  "https://api.mapbox.com",
  "https://*.tiles.mapbox.com",
  "https://events.mapbox.com",
];
const fontSrcUrls = [
  "https://fonts.googleapis.com",
  "https://fonts.googleapis.com/css2",
  "https://use.fontawesome.com/releases/v5.15.3/webfonts/",
  "https://fonts.gstatic.com/s/roboto/v30/",
];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/abhi97/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
        "https://images.unsplash.com",
        "https://unsplash.com/photos",
      ],
      fontSrc: ["'self'", ...fontSrcUrls],
    },
  })
);

// this to be before passport.session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log("Session Details ............... ");
  console.log(req.user);
  console.log(req.body);

  res.locals.currentUser = req.user;

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.reviewflash = req.flash("reviewflash");
  next();
});

// prefixing our path
app.use("/", userRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes); // by default we  donot have access to id in our reviews model so we need mergeprams so we pass new arguement
// mergePrams in router to get id as well in reviews router

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  // for any path this will run (mean for any type request will run if above will not return )
  //  res.send('404 !!!! ')
  next(new ExpressError("Page Not Found ", 404));
});

//defining our error  if something went wrong
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err; // eefault code and default message
  //   res.status(statusCode).send(message+"  *****  Error Thrown *****");
  //   res.send('Ohhh Boy Something Went Wrong!!! ');
  // we can also decide on the basis of error what to show

  if (!err.message) {
    err.statusCode = 500;
    err.message = "Something Went Wrong Please again try later";
  }
  // we are editing our message what ever coming as message
  // because user not intrested in understanding error
  res.status(statusCode).render("error", { err }); // passing entire error to templet
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
