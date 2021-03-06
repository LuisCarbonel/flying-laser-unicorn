# PROJECT DESCRIPTION

The goal of this web application is to see all the ideas of places to go for lunch around General Assembly. Users will be able to see spots to eat, and certain descriptions about the specific restaurants. (ex: price range, type of restaurant, if it includes take-out or not) A User that is signed up to the website will be able to submit restaurant to the database with all the details about it, as well as comment on the restaurants posted. The user will be able to search by specific parameters to get a list or a restaurant that fits their search. (ex: search by price range)

The struggles expected to face are going to be with editing and deleting comments as well as working with AUTH. How we are planning to work through these more challenging points of building this app is going to be to work together closely especially with these points, as well as tackle them pretty early on in the project so that we have the time to work through them. But with all the ressources available to us, we are confident that we will be able to work through it. 

MVP - Will be to meet the requirements of the project and get everything working properly. (editing, deleting and posting comments as well as submitting restaurants, signing up for the website ... )

POST MVP - 
Implementing a random search button. So that when you don't have any idea what you feel like eating. You just have to press the button and the app will randomly generate a website for you, so you don't have to choose.
Adding a like option on restaurants that are posted and on other users comments. 
Using Transition Group React Libary 
Adding the Yelp API so users can check out the location map of the reaturatn they picked

## FEATURE LIST 

A user can create an account, sign-in, post a new restaurant, post a comment on a specific restaurant. Users can also update and delete their specific restaurant or comment they created

### Entity Relationship Diagram
[ERD](doc:flying_laser_unicorn_ERD.pdf) 
#### API Endpoint Documentations

The user will be able to get eateries. (FindAll Eateries)



##### Wireframes & Component Heirarchy
Landing Page: 
https://i.imgur.com/WCNaK7M.png
or 
https://i.imgur.com/Gf2drzJ.png
Restoraunt pages: 
https://i.imgur.com/VezBRQI.png
Contact us page: 
https://i.imgur.com/U6TFysh.png
Alternate Login page: 
https://i.imgur.com/LlbuOWI.png
First draft sketch: 
https://i.imgur.com/IHwPrJ3.jpg

< App > <br />
< NavBar > <br />
< NavBarSide > <br />
<Home > <br />
< About > <br />
< Intro > <br />
< RegisterUser > (Register From)  <br />
< LogInUser > (Login Form) <br />
< Eateries > (post an eatery) <br />
< EateriesList > <br />
< SingleEatery > <br />
< Random Eatery > <br />
< CommentList > <br />
< Comment Form > <br />

< Team > <br />
< HireUs > (footer) <br />

###### List Dependencies
express <br />
sequelize <br />
morgan <br />
nodemon <br />
pg <br />
body-parser <br />
bcrypt <br />
jsonwebtoken <br />
cors <br />
axios <br />



