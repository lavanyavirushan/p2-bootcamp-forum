const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./userRoutes');

router.get('/:post_id', async (req, res) => {
  // #swagger.tags = ['Comments']  
  try {
    const comments = await Comment.findAll({
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }
        ],
        where: {
          post_id: req.params.post_id
        },
        attributes: {
            exclude: ['user_id', 'post_id']
        }
      });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:comment_id', withAuth, async (req, res) => {
    // #swagger.tags = ['Comments']  
    try{
        const commentDestroy = await Comment.destroy({
            where: {
                id: req.params.comment_id
            }
        });
        if(commentDestroy){
            res.status(200).json({
                success: commentDestroy,
                message: "Successfully deleted the comment!"
            });
        }else{
            throw('This comment does not exist')
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: "Unable to delete the comment"
        })
    }
})


router.post('/:post_id', withAuth, async (req, res) => {
    // #swagger.tags = ['Comments']  
    try{

        const createComment = await Comment.create({
            comment: req.body.comment,
            post_id: req.params.post_id,
            user_id: req.session.user_id
        })

        if(createComment){
            res.status(200).json({
                success: createComment,
                message: "Successfully created the comment!"
            });
        }else{
            throw('Unable to create the comment!')
        }

    }catch(err){
        res.status(400).json({
            success: false,
            message: "Unable to create the comment"
        })
    }
})

router.put('/:comment_id', withAuth, async (req, res) => {
    // #swagger.tags = ['Comments']  
    try{

        const updateComment = await Comment.update({
            comment: req.body.comment
        },{
          where: {id: req.params.comment_id }
        });

        if(updateComment){
            res.status(200).json({
                success: updateComment,
                message: "Successfully updated the comment!"
            });
        }else{
            throw('Unable to update the comment!')
        }

    }catch(err){
        res.status(400).json({
            success: false,
            message: "Unable to update the comment"
        })
    }
})

module.exports = router;