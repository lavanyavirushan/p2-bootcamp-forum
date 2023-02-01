const router = require('express').Router();
const sequelize = require('../config/connection');
const { Category, Comment, User, UserPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/account', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [{model: UserPost, where: {user_id: req.session.user_id}}]
      });   
      // Get all the posts associated with the user
      const user = userData.get({ plain: true });
      res.render('accountpage', {
        ...user,        
        loggedIn: true
      });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/edit', withAuth,async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
      });   
      // Get all the posts associated with the user
      const user = userData.get({ plain: true });
      res.render('edit-profile', {
        ...user,        
        loggedIn: true
      });
      } catch (err) {
        res.status(500).json(err);
      }
});


module.exports = router;