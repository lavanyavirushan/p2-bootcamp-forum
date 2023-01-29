const router = require('express').Router();
const { UserPost, User, Category, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // #swagger.tags = ['UserPost']  
  try {
    const posts = await UserPost.findAll(
        {
            include: [
                Category, {
                            model: User,
                            attributes: { exclude: ['password']} // empty array means that no column from ModelB will be returned
                        }, 
                    ], 
            attributes: { 
                exclude: ['user_id', 'category_id'] 
            }
        }
    );

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['UserPost'] 
    try {
      const posts = await UserPost.findByPk(req.params.id,         {
        include: [
            Category, 
            {
                model: User,
                attributes: { exclude: ['password']}  // empty array means that no column from ModelB will be returned
            },
            {
                model: Comment,
                attributes: { exclude: ['user_id', 'post_id']},
                include: [{
                    model: User,
                    attributes: { exclude: ['password']} 
                }]
            } 
        ], 
        attributes: { 
            exclude: ['user_id', 'category_id'] 
        }
    });
  
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.post('/', withAuth, async (req, res) => {
    // #swagger.tags = ['UserPost'] 
    try {
      const posts = await UserPost.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
        category_id: req.body.category_id
      })
      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;
