# Yelp Camp
A Node.js Project from Udemy Web Development course-By Colt Steele. It is an Nodejs project following Model-View-Controller(MVC) architecture,allowing user to do full crud operations- login user, adding campground , adding review , deleting camp , rating camp , upload images and many more.

## Live Demo
  Click for Live Demo - [yelp-camp](https://yelpcamp-by-abhishek.herokuapp.com/).

## Built With
 ### Front End
  * HTML5
  * CSS3
  * Bootstrap 5
  * MapBox
 ### Back-end
  * Node.Js
  * Express.js
  * MongoDB
  * Mongoose
  * Helmet
  * Passport
  * Passport-local
  * Express-session
  * Cloudinary
  * Mapbox
  * Connect-flash
  * ejs-mate

  
## Features
  * Authentication:
    * Allow User to Register will email Id and Unique user name
    * Allow user to login and logout.
  * Authorization
    * User not allowed to delete or edit campground of other User
    * User will not allowed to make review with out Login
    * User allowed to manage  only its campground
  * Managing Account 
    * After successfull login -  user can create new campground , delete,update
    * Add review , delete review ,
    * Add photos , delete photos 
    * Get flash message as per user intraction will app  
  * Basic Functionalities
    * User can manage camp location on geo map
    * User can take help of cluster map to search campground
    * User can seach camp and sort them bases on rating (Working on it).
 
 
 
 
#  Run it locally  
  1. Clone or download this repository.
  2. Install MongoDb
  3. Create Cloudinary Account to get Create a cloudinary account to get an API key and secret code
  4. Create .env file then enter all detail you got from  Cloudinary Account.   
    `
     CLOUDINARY_CLOUD_NAME = name                                                                                           
     CLOUDINARY_KEY = Key                                                                                                       
     CLOUDINARY_SECRET = secret 
    `
    
   5.Install dependencies                                                                                                                         
        `npm install                                                                                                                   `
        
   6.Run locally                                                                                                                                            
      `nodemon app.js`
  
    
   
     
    
