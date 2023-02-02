const router = require('express').Router();
const sequelize = require('../config/connection');
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
    res.render('home', { title: 'my other page', likes: featured, layout: 'newmain' });

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;