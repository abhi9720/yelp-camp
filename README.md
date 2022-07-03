
<div align="center">
<img src="https://user-images.githubusercontent.com/68281476/175905107-286222cc-f9fc-4181-9633-4d02dd936af4.jpg" width="500px" height="400px">
</div>




#  <img src="https://github.com/abhi9720/yelp-camp/blob/master/public/img/campFire.svg" width="80px"> Yelp Camp <img src="https://cdn-icons-png.flaticon.com/512/3153/3153859.png" width="80px"> 


A Node.js Project from Udemy Web Development course-By Colt Steele. It is an Nodejs project following Model-View-Controller(MVC) architecture,allowing user to do full crud operations- login user, adding campground , adding review , deleting camp , rating camp , upload images and many more.

# Live Demo <img src="https://cdn-icons-png.flaticon.com/512/1020/1020535.png" width="70px">
  Click for Live Demo 1 - [yelp-camp](https://yelpcamp-base.herokuapp.com/).
  <br/>
  Click for Live Demo 2 - [yelp-camp](https://yelp-campbase.herokuapp.com/).
  
  
  ---
<br/>
<br/>

![img1](https://user-images.githubusercontent.com/68281476/175907721-8fdf97f1-200f-4ac3-8f60-320d13e9bf9a.png)  



***

![img3](https://user-images.githubusercontent.com/68281476/175907737-3879c2c5-c249-4568-9a5f-7454b7055281.png)

***

 ![img2](https://user-images.githubusercontent.com/68281476/175907692-cd80b180-5279-4430-ab6f-5613818473f3.png)
 
 ***
 
![im4](https://user-images.githubusercontent.com/68281476/175907710-a85196e1-b5a2-42d3-acd0-3039ed814854.png)



  ***
  
  

  
  ![camp](/uploads/camp_img.jpg)
  

## <img src="https://img.icons8.com/ios-glyphs/344/camping-tent.png" width="40px" > Built With
 ### <img src="https://cdn-icons.flaticon.com/png/512/1892/premium/1892780.png?token=exp=1656322430~hmac=c8ee19d49aa4e81a652e1467ac5440bf" width="20px" > Front End 
  * HTML5
  * CSS3
  * Bootstrap 5
  * MapBox
 ### <img src="https://cdn-icons.flaticon.com/png/512/1892/premium/1892780.png?token=exp=1656322430~hmac=c8ee19d49aa4e81a652e1467ac5440bf" width="20px" > Back-end
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

  
## <img src="https://img.icons8.com/ios-glyphs/344/camping-tent.png" width="40px" > Features
  * Authentication:
    * Allow User to Register with email Id and Unique user name
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
    * User can seach camp and sort them on the bases of rating (Working on it).
 
 
 

 
#  Run it locally  <img src="https://user-images.githubusercontent.com/68281476/175906354-c863b024-c973-4696-a767-4c949a22c674.png" width="60px"  >
  1. Clone or download this repository.
  2. Install MongoDb
  3. Create Cloudinary Account to get Create a cloudinary account to get an API key and secret code
  4. Create .env file then enter all detail you got from  Cloudinary Account.   
    `CLOUDINARY_CLOUD_NAME = name
     CLOUDINARY_KEY = Key
     CLOUDINARY_SECRET = secret  `    
  5. Install dependencies                                                                                                                         
        `npm install                                                                                                                   `        
  6. Run locally                                                                                                                                            
      `nodemon app.js`
  
    
   
     
    
