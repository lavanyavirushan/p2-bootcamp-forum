const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Category, Comment, User, UserPost, Likes } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to protect access to route
router.get('/create', withAuth, async (req, res) => {
    try{
        res.render('create-post', {loggedIn: req.session.loggedIn});
    }catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
});

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
    let user = "";
    if(req.session.loggedIn){
        user = req.session.user_id
    }
    const post_list = posts.map((post) => post.get({ plain: true }));
    res.render('posts', { posts: post_list, userId: user, loggedIn: req.session.loggedIn });

  }catch(err){
    res.status(500).render('500')
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
        let userDetail = "";
        if(req.session.loggedIn){
            //let user = req.session.user_id
            const user = await User.findOne({
                where: {
                    id: req.session.user_id
                },
                attributes: { exclude: ['password']},
            })
            userDetail = user.get({plain: true})
        }
        
        res.render('post-details', { postDetails: postDetails, user: userDetail, loggedIn: req.session.loggedIn });
  
    }catch(err){
        res.status(404).render('404')
    }
});


module.exports = router;