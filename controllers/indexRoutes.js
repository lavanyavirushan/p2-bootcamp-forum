const router = require('express').Router();
const { Category, Comment, User, UserPost, Likes } = require('../models');
const withAuth = require('../utils/auth');
const { Sequelize } = require('sequelize');

router.get('/', async (req, res) => {
  try{
    const likes = await UserPost.findAll({
        attributes: {
            include: [
              [Sequelize.fn('COUNT', Sequelize.col('likes.post_id')), 'count']
            ]
          },
          include: [Category,{
            attributes: [],
            model:Likes,
            duplicating: false,
            required: false
          }],
        group: ['user_post.id'],
        order: [['count', 'DESC']],
        limit: 3
    })

    const featured = likes.map((like) => like.get({ plain: true }));
    let user = "";
    if(req.session.loggedIn){
        user = req.session.user_id
    }
    
    res.render('home', { title: 'my other page', likes: featured, userId: user, loggedIn: req.session.loggedIn });

  }catch(err){
    res.status(500).render('500')
  }
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile/account');
        next();
    }  
    res.render('signup');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        res.redirect('/');
    }  
    res.render('login');
});

module.exports = router;