const router = require('express').Router();
const sequelize = require('../config/connection');
const { Category, Comment, User, UserPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try{
    // const categoriesData = await Category.findAll({attributes: 'name'});
    // //gets the plain object
    // const categories = categoriesData.map((cat) => cat.get({ plain: true }));

    res.render('carousel', {loggedIn: req.session.loggedIn});

  }catch(err){
    res.status(500).json(err);
  }
});
  
  // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: UserPost }],
    });
  
    const user = userData.get({ plain: true });
  
    res.render('profile', {
      ...user,
      logged_in: true
    });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    alert('in /');
    res.redirect('/');
    return;
  }  
    res.render('login');
  });
  
module.exports = router;