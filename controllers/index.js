const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const profileRoutes = require('./profileRoutes');
const indexRoutes = require('./indexRoutes');
const postRoutes = require('./postRoutes')

router.use('/', homeRoutes);
router.use('/home', indexRoutes);
router.use('/posts', postRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

module.exports = router;