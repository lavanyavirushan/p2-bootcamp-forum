const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Category, Comment, User, UserPost, Likes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try{
    const posts = await UserPost.findAll(
        {
            include: [
                Category, 
                {
                    model: User,
                    attributes: { exclude: ['password']}
                }, 
                { 
                    model: Likes,
                    attributes: []
                }     
            ], 
            attributes: { 
                include: [[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'total_likes']],
                exclude: ['user_id', 'category_id'] 
            },
            group: ['user_post.id']
        }
    );
    const post_list = posts.map((post) => post.get({ plain: true }));
    res.render('posts', { posts: post_list, layout: 'newmain' });

  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try{
        const posts = await UserPost.findOne(
            {
                where: {
                    id: req.params.id
                },
                include: [
                    Category, 
                    {
                        model: User,
                        attributes: { exclude: ['password']}
                    },
                    {
                        model: Comment,
                        attributes: { exclude: ['post_id'] }, 
                        include: [{
                            model: User,
                            attributes: { exclude: ['password']},
                        }]
                    },
                    { 
                        model: Likes,
                        attributes: [],
                    },
                ], 
                attributes: { 
                    include: [[Sequelize.fn('COUNT', Sequelize.col('likes.post_id')), 'total_likes']],
                    exclude: ['user_id', 'category_id'] 
                },
                group: ['comments.id']
            }
        );
        const postDetails = posts.get({plain: true})
        let user = "";
        if(req.session.loggedIn){
            user = req.session.user_id
        }
        console.log(user)
        res.render('post-details', { postDetails: postDetails, userId: user, layout: 'newmain' });
  
    }catch(err){
      res.status(500).json(err);
    }
  });

module.exports = router;