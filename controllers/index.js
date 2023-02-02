const router = require('express').Router();
const apiRoutes = require('./api');
const profileRoutes = require('./profileRoutes');
const indexRoutes = require('./indexRoutes');
const postRoutes = require('./postRoutes')

router.use('/', indexRoutes);
router.use(['/post', '/posts'], postRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

module.exports = router;