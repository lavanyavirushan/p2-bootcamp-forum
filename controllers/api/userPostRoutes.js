const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { UserPost, User, Category, Comment, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * This lists all the post by all users
 */
router.get('/', async (req, res) => {
  // #swagger.tags = ['User Post']  
  try {
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
    if(posts != null){
        res.status(200).json({
            status: 200,
            data: posts,
            message: "Success!"
        });
    }else{
        throw({error: "No posts available!"})
    }
  }catch(err) {
    const error = (err.error) ? err.error : err;
    res.status(400).json({
        status: 400,
        data: [],
        message: error
    });
  }
});

/**
 * This lists all the post by current loged in user
 * session parameter:
 * @param req.session.user_id
 */
router.get('/by-current-user', withAuth, async (req, res) => {
    // #swagger.tags = ['User Post']  
    try {
        const posts = await UserPost.findAll(
            {
                where:{
                    user_id: req.session.user_id
                },
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
  
        if(posts != null){
            res.status(200).json({
                status: 200,
                data: posts,
                message: "Success!"
            });
        }else{
            throw({error: "No posts available!"})
        }
    } catch (err) {
        const error = (err.error) ? err.error : err;
        res.status(400).json({
            status: 400,
            data: [],
            message: error
        });
    }
});

/**
 * This list all post by requested category
 * URL parameter:
 * @param req.param.category_id
 */
router.get('/by-category/:category_id', async (req, res) => {
    // #swagger.tags = ['User Post']  
    try {
        const posts = await UserPost.findAll(
            {
                where:{
                    category_id: req.params.category_id
                },
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
  
        if(posts != null){
            res.status(200).json({
                status: 200,
                data: posts,
                message: "Success!"
            });
        }else{
            throw({error: "No posts available!"})
        }
    } catch (err) {
        const error = (err.error) ? err.error : err;
        res.status(400).json({
            status: 400,
            data: [],
            message: error
        });
    }
});

/**
 * This returns details of single user post
 * Includes:
 * - Category of post.
 * - Which User Created the post
 * - List of Comments by users
 * - and the total number of likes for the post
 * URL parameter:
 * @param req.params.id this is th user post id
 */
router.get('/:id', async (req, res) => {
    // #swagger.tags = ['User Post'] 
    try {
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
                    attributes: { exclude: ['user_id', 'post_id'] }, 
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
                include: [[Sequelize.fn('COUNT', Sequelize.col('likes.id')), 'total_likes']],
                exclude: ['user_id', 'category_id'] 
            },
            group: ['comments.id']
        });

        if(posts != null){
            res.status(200).json({
                status: 200,
                data: posts,
                message: "Success!"
            });
        }else{
            throw({error: "This post does not exist!"})
        }
    } catch (err) {
        const error = (err.error) ? err.error : err;
        res.status(400).json({
            status: 400,
            data: [],
            message: error
        });
    }
});

/**
 * Creates new user post
 * POST parameter:
 *  @param req.body.title, 
 *  @param req.body.description 
 *  @param req.body.category_id
 * session parameter:
 *  @param req.session.user_id
 */
router.post('/', withAuth, async (req, res) => {
    // #swagger.tags = ['User Post'] 
    try {
      const newPost = await UserPost.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
        category_id: req.body.category_id
      });
      res.status(200).json({
        status: 200,
        data: newPost,
        message: "Successfully created the post!"
      });

    } catch (err) {
      res.status(400).json({
        status: 400,
        data: [],
        message: "Unable to create new post at this time!"
      });
    }
});

/**
 * This creates likes if user likes the post by creating new record if it does not already exist
 * URL parameter:
 * @param req.params.post_id
 * Session parameter:
 * @param req.session.user_id 
 */
router.post('/:post_id/like', withAuth, async (req, res) => {
    // #swagger.tags = ['User Post Likes'] 
    try {
        const like = await Likes.findOrCreate({
            where: {//object containing fields to found
                user_id: req.session.user_id,
                post_id: req.params.post_id
            },
            defaults: {//object containing fields and values to apply
                user_id: req.session.user_id,
                post_id: req.params.post_id
            },
            attributes: { exclude: ['user_id', 'post_id']},
        });

        if(like){
            res.status(200).json({
                status: 200,
                data: like[0],
                message: "Success"
            });
        }else{
            throw({ error: "Unable to like this post" })
        }                
    }catch(err){
        const error = (err.error) ? err.error : "Something went wrong please try again later";
        res.status(400).json({
            status: 400,
            data: [],
            message: error
        });
    }
});

/**
 * Deletes the like if user decide to remove like for the post they liked previously
 * URL parameter:
 * @param req.params.post_id
 * Session parameter:
 * @param req.session.user_id 
 */
router.delete('/:post_id/like', withAuth, async (req, res) => {
    // #swagger.tags = ['User Post Likes'] 
    try {
        const like = await Likes.destroy({
            where: {
                user_id: req.session.user_id,
                post_id: req.params.post_id
            }
        });
                           
        if(like){
            res.status(200).json({
                status: 200,
                data: { success: like },
                message: "Successfully deleted the like!"
            });   
        }else{
            throw("Unable remove the like!")
        }                             
    }catch(err){
        const error = (err.error) ? err.error : "Unable to process the request at this time please try again later!"
        res.status(400).json({
            status: 400,
            data: [],
            message: error
        });
    }
});


module.exports = router;
