const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userPostRoutes = require('./userPostRoutes');
const categoryRoutes = require('./categoryRoutes');
//const projectRoutes = require('./projectRoutes');

router.use('/user', userRoutes);
router.use('/posts', userPostRoutes);
router.use('/categories', categoryRoutes);
//router.use('/projects', projectRoutes);

module.exports = router;