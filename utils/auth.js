// FROM ACTIVITY 14.20
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  // This is directly from the `/gallery/:id` and `/painting/:id` routes
  if (!req.session.loggedIn) {
    //This condition protect the api routes and front-end routes 
    if(req.originalUrl.indexOf('api') > -1){
       res.status(401).json({
        status: 401,
        message: "Unauthorized user not logged in!"
      });
    }else{
      res.redirect('/login');
    }
  } else {
    // If the user is logged in, execute the route function that will allow them to view the gallery
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = withAuth;

  