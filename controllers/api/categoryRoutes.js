const router = require('express').Router();
const { Category } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  // #swagger.tags = ['Category']  
  try {
    const newProject = await Category.findAll();
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
    // #swagger.tags = ['Category']  
    try {
        const category = await Category.create({
            name: req.body.name,
          });
      res.status(200).json(category);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    // #swagger.tags = ['Category']  
    try {
        const category = await Category.update({
            name: req.body.name,
          },{
            where: {id: req.params.id }
          });
      res.status(200).json({success: Boolean(category)});
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    // #swagger.tags = ['Category']  
    try {
        const category = await Category.destroy({ where: { id: req.params.id } });
        res.status(200).json({success: Boolean(category)});
    } catch (err) {
        res.status(400).json(err);
    }
  });

module.exports = router;
