const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Category, Comment, User, UserPost, Likes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/account', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
      });

      const user_posts_res = await UserPost.findAll(
        {
            where:{
                user_id: req.session.user_id
            },
            include: [
                Category, 
                { 
                    model: Likes,
                    attributes: []
                }     
            ], 
            attributes: { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'total_likes']],
                exclude: ['user_id', 'category_id'] 
            },
            group: ['user_post.id'],
            raw : true ,
            nest : true
        }
      );
      
      // Get all the posts associated with the user
      const user = (userData == null) ? [] : userData.get({ plain: true });
      const user_post = (user_posts_res == null) ? [] : user_posts_res;
      
      res.render('accountpage', {
        user: user,     
        user_posts: user_post,
        loggedIn: true
      });
    } catch (err) {
        console.log(err)
        res.status(500).render('500')
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
        res.status(500).render('500')
      }
});


module.exports = router;